import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CHECK-SUBSCRIPTION] ${step}${d}`);
};

// Map a Stripe price ID back to our internal tier slug.
const PRICE_TO_TIER: Record<string, string> = {
  price_1SZEevH0XahPXnwCMlxyP8FE: "starter",
  price_1SZEslH0XahPXnwC72g9KwsS: "starter",
  price_1SZEgtH0XahPXnwCP6q7zf31: "growth",
  price_1SZEwLH0XahPXnwCCA9fv6XP: "growth",
  price_1SZEhcH0XahPXnwCyzrMLV2Z: "scale",
  price_1SZExYH0XahPXnwC8DWfKLLt: "scale",
  price_1SZEjcH0XahPXnwC4DhIic4L: "authority",
  price_1SZEzbH0XahPXnwCVDnWINbi: "authority",
  price_1SZEnZH0XahPXnwCZbQeBQPM: "dominance",
  price_1SZF0ZH0XahPXnwCr9QNOkD1: "dominance",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await supabaseUser.auth.getClaims(token);
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claims.claims.sub as string;
    const userEmail = claims.claims.email as string | undefined;
    log("User", { userId, userEmail });

    // Service-role client for writing back to subscribers (bypasses RLS).
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Look up the existing subscriber row.
    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("stripe_customer_id, email")
      .eq("user_id", userId)
      .maybeSingle();

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not configured");
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Resolve a Stripe customer ID via stored ID, then email fallbacks.
    let customerId: string | null = existing?.stripe_customer_id ?? null;
    if (!customerId) {
      const candidates = [existing?.email, userEmail, "billing@scriptstorm.org"]
        .filter((e): e is string => !!e && e.trim() !== "");
      for (const email of [...new Set(candidates)]) {
        const list = await stripe.customers.list({ email, limit: 5 });
        if (list.data.length > 0) {
          customerId = list.data[0].id;
          log("Found Stripe customer by email", { email, customerId });
          break;
        }
      }
    }

    if (!customerId) {
      log("No Stripe customer found");
      return new Response(
        JSON.stringify({ subscribed: false, reason: "no_customer" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Look at the customer's most relevant subscription.
    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });

    const active = subs.data.find((s) =>
      ["active", "trialing", "past_due"].includes(s.status)
    ) || subs.data[0];

    if (!active) {
      log("No subscriptions on customer");
      await supabaseAdmin
        .from("subscribers")
        .update({
          subscribed: false,
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      return new Response(
        JSON.stringify({ subscribed: false, reason: "no_subscription" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const item = active.items.data[0];
    const price = item?.price;
    const interval = price?.recurring?.interval; // "month" | "year"
    const billingCycle = interval === "year" ? "annual" : "monthly";
    const tier = price?.id ? PRICE_TO_TIER[price.id] ?? null : null;
    const periodEnd = active.current_period_end
      ? new Date(active.current_period_end * 1000).toISOString()
      : null;
    const subscribed = ["active", "trialing"].includes(active.status);

    log("Resolved subscription", { tier, billingCycle, periodEnd, status: active.status });

    const updatePayload: Record<string, unknown> = {
      subscribed,
      stripe_customer_id: customerId,
      subscription_end: periodEnd,
      billing_cycle: billingCycle,
      updated_at: new Date().toISOString(),
    };
    if (tier) updatePayload.subscription_tier = tier;

    const { error: updateErr } = await supabaseAdmin
      .from("subscribers")
      .update(updatePayload)
      .eq("user_id", userId);
    if (updateErr) log("Update error", { updateErr });

    return new Response(
      JSON.stringify({
        subscribed,
        subscription_tier: tier,
        subscription_end: periodEnd,
        billing_cycle: billingCycle,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log("ERROR", { msg });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});