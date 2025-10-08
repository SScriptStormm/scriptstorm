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

    const { selectedAddOns, packageType = "starter", billing = "monthly" } = await req.json();
    logStep("Request data", { selectedAddOns, packageType, billing });

    // Use guest email for all checkouts since no auth is required
    const userEmail = "billing@scriptstorm.org";
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

    // Package pricing for both monthly and annual billing
    const packagePricing = {
      starter: { 
        monthly: { amount: 29700, name: "ScriptStorm Starter Package - $297 USD", description: "5 SEO Articles + 15 Social Posts + 5 Product Descriptions monthly" },
        annual: { amount: 285000, name: "ScriptStorm Starter Package - $2,850 USD/year (Get 2 Months Free!)", description: "5 SEO Articles + 15 Social Posts + 5 Product Descriptions monthly - Annual Plan" }
      },
      growth: { 
        monthly: { amount: 59700, name: "ScriptStorm Growth Package - $597 USD", description: "10 SEO Articles + 30 Social Posts + 10 Product Descriptions monthly" },
        annual: { amount: 573000, name: "ScriptStorm Growth Package - $5,730 USD/year (Get 2 Months Free!)", description: "10 SEO Articles + 30 Social Posts + 10 Product Descriptions monthly - Annual Plan" }
      },
      "starter-enterprise": { 
        monthly: { amount: 129700, name: "ScriptStorm Scale - $1,297 USD", description: "25 SEO Articles + 75 Social Posts + 25 Product Descriptions monthly" },
        annual: { amount: 1245000, name: "ScriptStorm Scale - $12,450 USD/year (Get 2 Months Free!)", description: "25 SEO Articles + 75 Social Posts + 25 Product Descriptions monthly - Annual Plan" }
      },
      "growth-enterprise": { 
        monthly: { amount: 179700, name: "ScriptStorm Authority - $1,797 USD", description: "30 SEO Articles + 90 Social Posts + 30 Product Descriptions monthly" },
        annual: { amount: 1725000, name: "ScriptStorm Authority - $17,250 USD/year (Get 2 Months Free!)", description: "30 SEO Articles + 90 Social Posts + 30 Product Descriptions monthly - Annual Plan" }
      },
      "authority-enterprise": { 
        monthly: { amount: 299700, name: "ScriptStorm Dominance - $2,997 USD", description: "50 SEO Articles + 150 Social Posts + Unlimited Product Descriptions monthly" },
        annual: { amount: 2877000, name: "ScriptStorm Dominance - $28,770 USD/year (Get 2 Months Free!)", description: "50 SEO Articles + 150 Social Posts + Unlimited Product Descriptions monthly - Annual Plan" }
      }
    };

    // Get the correct package and billing type
    const packageData = packagePricing[packageType] || packagePricing.starter;
    const selectedPackage = billing === "annual" ? packageData.annual : packageData.monthly;
    const recurringInterval = billing === "annual" ? "year" : "month";
    
    logStep("Package selected", { packageType, billing, selectedPackage, recurringInterval });

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: selectedPackage.name,
            description: selectedPackage.description
          },
          unit_amount: selectedPackage.amount,
          recurring: { interval: recurringInterval },
        },
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