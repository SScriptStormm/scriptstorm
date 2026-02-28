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

    // Parse optional flow_type from body
    let flowType: string | null = null;
    try {
      const body = await req.json();
      flowType = body?.flow_type || null;
    } catch {
      // No body or invalid JSON — that's fine, default to generic portal
    }
    logStep("Flow type", { flowType });

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
      const emailsToTry = [
        subscriber?.email,
        userEmail,
        "billing@scriptstorm.org",
      ].filter((e): e is string => !!e && e.trim() !== "");

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

    const returnUrl = "https://scriptstorm.org/account-settings";

    // Build portal session params
    const portalParams: Stripe.BillingPortal.SessionCreateParams = {
      customer: customerId,
      return_url: returnUrl,
    };

    // If flow_type provided, build flow_data with subscription lookup
    if (flowType && ["subscription_update", "subscription_cancel", "payment_method_update"].includes(flowType)) {
      if (flowType === "payment_method_update") {
        portalParams.flow_data = {
          type: "payment_method_update",
        };
        logStep("Using flow_data for payment_method_update");
      } else {
        // Need subscription ID for subscription_update and subscription_cancel
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: "active",
          limit: 1,
        });

        if (subscriptions.data.length > 0) {
          const subscriptionId = subscriptions.data[0].id;
          logStep("Found active subscription", { subscriptionId });

          if (flowType === "subscription_update") {
            portalParams.flow_data = {
              type: "subscription_update",
              subscription_update: { subscription: subscriptionId },
            };
          } else if (flowType === "subscription_cancel") {
            portalParams.flow_data = {
              type: "subscription_cancel",
              subscription_cancel: { subscription: subscriptionId },
            };
          }
        } else {
          logStep("No active subscription found for flow_data, falling back to generic portal");
        }
      }
    }

    let session;
    try {
      session = await stripe.billingPortal.sessions.create(portalParams);
    } catch (err) {
      if (portalParams.flow_data) {
        logStep("flow_data caused error, retrying without it", { error: err instanceof Error ? err.message : String(err) });
        delete portalParams.flow_data;
        session = await stripe.billingPortal.sessions.create(portalParams);
      } else {
        throw err;
      }
    }
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
