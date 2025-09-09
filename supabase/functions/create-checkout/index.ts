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

  try {
    logStep("Function started");

    // Create Supabase client using the anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Retrieve authenticated user - REQUIRED for security
    const authHeader = req.headers.get("Authorization");
    logStep("Auth header received", { hasHeader: !!authHeader });
    
    if (!authHeader) {
      throw new Error("Authentication required. Please log in to create a checkout session.");
    }
    
    const token = authHeader.replace("Bearer ", "");
    logStep("Extracted token", { tokenLength: token.length, tokenStart: token.substring(0, 20) + "..." });
    
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    logStep("Auth check result", { hasUser: !!data.user, error: authError?.message });
    
    if (authError || !data.user?.email) {
      logStep("Authentication failed", { error: authError?.message, hasUser: !!data.user, hasEmail: !!data.user?.email });
      throw new Error("Invalid authentication. Please log in again.");
    }
    
    const user = data.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not found");
    logStep("Stripe key verified");

    const { selectedAddOns, packageType = "starter" } = await req.json();
    logStep("Request data", { selectedAddOns, packageType });

    // Use authenticated user's email instead of guest checkout
    const userEmail = user.email;
    const userId = user.id;
    logStep("Using authenticated user", { email: userEmail, userId });

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
      starter: { amount: 29700, name: "ScriptStorm Starter Package - $297 USD", description: "5 SEO Articles + 15 Social Posts + 5 Product Descriptions monthly" },
      growth: { amount: 59700, name: "ScriptStorm Growth Package - $597 USD", description: "10 SEO Articles + 30 Social Posts + 10 Product Descriptions monthly" },
      "starter-enterprise": { amount: 129700, name: "ScriptStorm Scale - $1,297 USD", description: "20 SEO Articles + 60 Social Posts + 20 Product Descriptions monthly" },
      "growth-enterprise": { amount: 179700, name: "ScriptStorm Authority - $1,797 USD", description: "30 SEO Articles + 90 Social Posts + 30 Product Descriptions monthly" },
      "authority-enterprise": { amount: 299700, name: "ScriptStorm Dominance - $2,997 USD", description: "50 SEO Articles + 150 Social Posts + Unlimited Product Descriptions monthly" }
    };

    // Remove add-on handling since all packages are now all-inclusive
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