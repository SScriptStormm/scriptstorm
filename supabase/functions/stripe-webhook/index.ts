import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[STRIPE-WEBHOOK] ${step}${d}`);
};

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

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function syncSubscription(subscriptionId: string, fallback?: {
  userId?: string | null;
  email?: string | null;
  customerId?: string | null;
}) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const item = sub.items.data[0];
  const price = item?.price;
  const interval = price?.recurring?.interval;
  const billingCycle = interval === "year" ? "annual" : "monthly";
  const tier = price?.id ? PRICE_TO_TIER[price.id] ?? null : null;
  const periodEnd = sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : null;
  const subscribed = ["active", "trialing"].includes(sub.status);

  const userId = (sub.metadata?.user_id as string | undefined) ?? fallback?.userId ?? null;
  const customerId = (typeof sub.customer === "string" ? sub.customer : sub.customer?.id) ?? fallback?.customerId ?? null;

  let email = fallback?.email ?? null;
  if (!email && customerId) {
    try {
      const c = await stripe.customers.retrieve(customerId);
      if (c && !("deleted" in c && c.deleted)) email = (c as Stripe.Customer).email ?? null;
    } catch (_) {}
  }

  if (!userId) {
    log("No user_id available, cannot upsert", { subscriptionId, customerId, email });
    return;
  }

  const payload: Record<string, unknown> = {
    user_id: userId,
    email: email ?? "",
    stripe_customer_id: customerId,
    subscribed,
    subscription_end: periodEnd,
    billing_cycle: billingCycle,
    updated_at: new Date().toISOString(),
  };
  if (tier) payload.subscription_tier = tier;

  const { error } = await supabaseAdmin
    .from("subscribers")
    .upsert(payload, { onConflict: "user_id" });
  if (error) log("Upsert error", { error });
  else log("Synced subscription", { userId, tier, billingCycle, subscribed });
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!signature || !webhookSecret) {
    log("Missing signature or secret");
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log("Signature verification failed", { msg });
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }

  log("Event received", { type: event.type, id: event.id });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;
        if (!subscriptionId) break;

        const userId =
          (session.metadata?.user_id as string | undefined) ??
          (session.client_reference_id as string | undefined) ??
          null;
        const email = session.customer_details?.email ?? session.customer_email ?? null;
        const customerId = typeof session.customer === "string"
          ? session.customer
          : session.customer?.id ?? null;

        // Backfill subscription metadata so future updates carry user_id
        if (userId) {
          try {
            await stripe.subscriptions.update(subscriptionId, {
              metadata: { user_id: userId },
            });
          } catch (e) {
            log("Failed to set subscription metadata", { e: String(e) });
          }
        }

        await syncSubscription(subscriptionId, { userId, email, customerId });
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await syncSubscription(sub.id);
        break;
      }
      default:
        log("Unhandled event", { type: event.type });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log("Handler error", { msg });
    return new Response(`Handler error: ${msg}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});