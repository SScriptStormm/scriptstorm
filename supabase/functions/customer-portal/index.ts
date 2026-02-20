import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      logStep("Auth failed", { claimsError });
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email as string | undefined;
    logStep("User authenticated", { userId, userEmail });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not configured");
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Look up stripe_customer_id from subscribers table
    const { data: subscriber, error: subError } = await supabase
      .from("subscribers")
      .select("stripe_customer_id, email")
      .eq("user_id", userId)
      .single();

    logStep("Subscriber lookup", { subscriber, subError });

    let customerId: string | null = subscriber?.stripe_customer_id ?? null;

    // If no customer ID stored, try multiple email fallbacks in sequence
    if (!customerId) {
      // Build list of emails to try, in order of likelihood
      const emailsToTry = [
        subscriber?.email,          // e.g. ethaprotect@gmail.com (from DB)
        userEmail,                  // e.g. hello@scriptstorm.org (from auth)
        "billing@scriptstorm.org",  // hardcoded fallback (used during checkout)
      ].filter((e): e is string => !!e && e.trim() !== "");

      // Deduplicate
      const uniqueEmails = [...new Set(emailsToTry)];

      logStep("Searching Stripe by email fallbacks", { uniqueEmails });

      for (const email of uniqueEmails) {
        const customers = await stripe.customers.list({ email, limit: 5 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logStep("Found Stripe customer by email", { email, customerId });
          break;
        }
        logStep("No Stripe customer found for email", { email });
      }
    }

    if (!customerId) {
      logStep("No Stripe customer found across all email fallbacks");
      return new Response(
        JSON.stringify({ error: "No active subscription found. Please subscribe first." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determine return URL from Origin header
    const origin = req.headers.get("origin") || "https://scriptstorm.lovable.app";
    const returnUrl = `${origin}/account-settings`;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    logStep("Portal session created", { url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
