import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("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");
    if (!stripeKey) throw new Error("Stripe secret key not found");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { selectedAddOns } = await req.json();
    logStep("Request data", { selectedAddOns });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Build line items
    const lineItems = [
      {
        price: "price_1QZWJnH0XahPXnwCg9wBjTKY", // Base plan - replace with your actual price ID
        quantity: 1,
      }
    ];

    // Add SEO add-on if selected
    if (selectedAddOns?.seo) {
      lineItems.push({
        price: "price_1QZWKaH0XahPXnwC4m2vLnPQ", // SEO add-on - replace with your actual price ID
        quantity: 1,
      });
    }

    // Add Editing add-on if selected
    if (selectedAddOns?.editing) {
      lineItems.push({
        price: "price_1QZWL5H0XahPXnwC9jX8kQmR", // Editing add-on - replace with your actual price ID
        quantity: 1,
      });
    }

    logStep("Line items prepared", { lineItems });

    const origin = req.headers.get("origin") || "https://akqbsuvbammezjyeospk.supabase.co";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "subscription",
      payment_method_types: ["card", "alipay", "wechat_pay"],
      success_url: `${origin}/thank-you?order_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      billing_address_collection: "required",
      metadata: {
        user_id: user.id,
        seo_addon: selectedAddOns?.seo ? "true" : "false",
        editing_addon: selectedAddOns?.editing ? "true" : "false",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});