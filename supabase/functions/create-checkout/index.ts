import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

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

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not found");
    logStep("Stripe key verified");

    const { selectedAddOns, packageType = "starter" } = await req.json();
    logStep("Request data", { selectedAddOns, packageType });

    // Use guest email for all checkouts since no auth is required
    const userEmail = "guest@scriptstorm.com";
    const userId = "guest";
    logStep("Using guest checkout", { email: userEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create line items based on package type
    const packagePricing = {
      starter: { amount: 29700, name: "ScriptStorm Starter Package", description: "5 SEO Articles monthly" },
      growth: { amount: 59700, name: "ScriptStorm Growth Package", description: "10 SEO Articles monthly" },
      "starter-enterprise": { amount: 129700, name: "ScriptStorm Starter Enterprise", description: "20+ SEO Articles monthly with 100 social posts included" },
      "growth-tier": { amount: 179700, name: "ScriptStorm Growth Tier", description: "30+ SEO Articles monthly with advanced features" },
      "authority-tier": { amount: 299700, name: "ScriptStorm Authority Tier", description: "50+ SEO Articles monthly with premium support" },
      "social-media-starter-addon": { amount: 19700, name: "Social Media Add-On for Starter", description: "30 AI social media posts monthly" },
      "social-media-growth-addon": { amount: 29700, name: "Social Media Add-On for Growth", description: "50 AI social media posts monthly" }
    };

    const selectedPackage = packagePricing[packageType] || packagePricing.starter;
    
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: selectedPackage.name,
            description: selectedPackage.description
          },
          unit_amount: selectedPackage.amount,
          recurring: { interval: "month" },
        },
        quantity: 1,
      }
    ];

    // Add SEO add-on if selected
    if (selectedAddOns?.seo) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "SEO Optimization Add-on",
            description: "Professional SEO optimization with SurferSEO integration"
          },
          unit_amount: 19700, // $197 in cents
          recurring: { interval: "month" },
        },
        quantity: 1,
      });
    }

    // Add Editing add-on if selected
    if (selectedAddOns?.editing) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Native-Language Editing Add-on",
            description: "Human polish for US/UK/EU/Asia markets"
          },
          unit_amount: 14700, // $147 in cents
          recurring: { interval: "month" },
        },
        quantity: 1,
      });
    }

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
      metadata: {
        user_id: userId,
        user_email: userEmail,
        package_type: packageType,
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