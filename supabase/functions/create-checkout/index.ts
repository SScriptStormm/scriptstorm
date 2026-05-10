import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not found");
    logStep("Stripe key verified");

    const { selectedAddOns, packageType = "starter", billing = "monthly" } = await req.json();
    logStep("Request data", { selectedAddOns, packageType, billing });

    // Require authenticated user so Stripe subscription maps back to the buyer
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
    if (claimsErr || !claims?.claims?.sub || !claims?.claims?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claims.claims.sub as string;
    const userEmail = claims.claims.email as string;
    logStep("Authenticated user", { userId, userEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Stripe Price IDs for all packages (Test Mode)
    const priceIds: Record<string, { monthly: string; annual: string }> = {
      starter: {
        monthly: "price_1SZEevH0XahPXnwCMlxyP8FE",
        annual: "price_1SZEslH0XahPXnwC72g9KwsS"
      },
      growth: {
        monthly: "price_1SZEgtH0XahPXnwCP6q7zf31",
        annual: "price_1SZEwLH0XahPXnwCCA9fv6XP"
      },
      "starter-enterprise": {  // Scale tier
        monthly: "price_1SZEhcH0XahPXnwCyzrMLV2Z",
        annual: "price_1SZExYH0XahPXnwC8DWfKLLt"
      },
      "growth-enterprise": {   // Authority tier
        monthly: "price_1SZEjcH0XahPXnwC4DhIic4L",
        annual: "price_1SZEzbH0XahPXnwCVDnWINbi"
      },
      "authority-enterprise": { // Dominance tier
        monthly: "price_1SZEnZH0XahPXnwCZbQeBQPM",
        annual: "price_1SZF0ZH0XahPXnwCr9QNOkD1"
      }
    };

    // Validate package type
    const packagePrices = priceIds[packageType];
    if (!packagePrices) {
      throw new Error(`Invalid package type: ${packageType}`);
    }

    // Get the correct price ID based on billing cycle
    const selectedPriceId = billing === "annual" ? packagePrices.annual : packagePrices.monthly;
    
    logStep("Price ID selected", { packageType, billing, selectedPriceId });

    const lineItems = [
      {
        price: selectedPriceId,
        quantity: 1,
      }
    ];

    logStep("Line items prepared", { lineItems });

    const origin = req.headers.get("origin") || "https://akqbsuvbammezjyeospk.supabase.co";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: lineItems,
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${origin}/thank-you?order_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      billing_address_collection: "required",
      client_reference_id: userId,
      subscription_data: {
        metadata: {
          user_id: userId,
          user_email: userEmail,
          package_type: packageType,
        },
      },
      metadata: {
        user_id: userId,
        user_email: userEmail,
        package_type: packageType
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