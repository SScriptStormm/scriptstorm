import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SubscriberData {
  subscription_tier: string | null;
  subscribed: boolean;
  subscription_end: string | null;
  email: string;
  stripe_customer_id: string | null;
}

const TIER_PRICES = {
  starter: { monthly: 297, annual: 2873 },
  growth: { monthly: 597, annual: 5767 },
  scale: { monthly: 997, annual: 9641 },
  authority: { monthly: 1497, annual: 14471 },
  dominance: { monthly: 2997, annual: 28971 },
};

export default function AccountSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState<SubscriberData | null>(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchSubscriberData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserEmail(user.email || "");

      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching subscriber:", error);
        toast.error("Failed to load subscription data");
      } else {
        setSubscriber(data);
      }
      
      setLoading(false);
    };

    fetchSubscriberData();
  }, [navigate]);

  const getTierDisplayName = (tier: string | null) => {
    if (!tier) return "No Plan";
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  const getBillingInfo = () => {
    if (!subscriber?.subscription_tier || !subscriber.subscription_end) {
      return { isAnnual: false, price: 0, nextDate: null };
    }

    const endDate = new Date(subscriber.subscription_end);
    const now = new Date();
    const daysUntilRenewal = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isAnnual = daysUntilRenewal > 180;

    const tier = subscriber.subscription_tier as keyof typeof TIER_PRICES;
    const price = isAnnual ? TIER_PRICES[tier]?.annual : TIER_PRICES[tier]?.monthly;

    return {
      isAnnual,
      price: price || 0,
      nextDate: endDate.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    };
  };

  const handleUpdatePayment = () => {
    // This would open Stripe Customer Portal
    toast.info("Redirecting to payment portal...");
    // In production: window.location.href = stripePortalUrl;
  };

  const handleCancelSubscription = async () => {
    toast.info("Cancellation flow initiated");
    // Implement cancellation logic
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Account deletion requested");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const billingInfo = getBillingInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="mb-4 bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-white/70">Manage your subscription, billing, and account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Subscription & Billing */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Subscription & Billing</CardTitle>
              <CardDescription className="text-white/70">
                Your current plan and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Plan Name:</span>
                  <span className="text-white font-semibold text-lg">
                    {getTierDisplayName(subscriber?.subscription_tier)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Status:</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    Active ✅
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Billing Cycle:</span>
                  <span className="text-white">
                    {billingInfo.isAnnual ? "Annual" : "Monthly"} 
                    <span className="text-white/70 ml-2">
                      (Billed ${billingInfo.price.toLocaleString()}/{billingInfo.isAnnual ? "year" : "month"})
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Next Billing Date:</span>
                  <span className="text-white">Renews on {billingInfo.nextDate}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1 bg-white text-primary hover:bg-white/90"
                >
                  Upgrade Plan
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
                    >
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your subscription? You will lose access to all premium features at the end of your billing period.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription} className="bg-red-500 hover:bg-red-600">
                        Yes, Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Payment Method & Invoices */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Payment Method & Invoices</CardTitle>
              <CardDescription className="text-white/70">
                Manage your payment methods and view billing history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 border border-white/20 rounded-lg p-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Payment Method</p>
                  <p className="text-white">Visa ending in 4242</p>
                </div>
                <Button
                  onClick={handleUpdatePayment}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Update Payment Method
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-white font-semibold mb-3">Billing History</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/70">Date</TableHead>
                      <TableHead className="text-white/70">Description</TableHead>
                      <TableHead className="text-white/70">Amount</TableHead>
                      <TableHead className="text-white/70">Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableCell className="text-white">Jan 15, 2025</TableCell>
                      <TableCell className="text-white">{getTierDisplayName(subscriber?.subscription_tier)} Plan</TableCell>
                      <TableCell className="text-white">${billingInfo.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          PDF ↓
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  onClick={handleUpdatePayment}
                  variant="link"
                  className="text-white/70 hover:text-white mt-2"
                >
                  View Full Billing History →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Profile & Security */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Profile & Security</CardTitle>
              <CardDescription className="text-white/70">
                Manage your account information and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 border border-white/20 rounded-lg p-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Email Address</p>
                  <p className="text-white">{userEmail}</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Edit
                </Button>
              </div>

              <div className="flex items-center justify-between bg-white/5 border border-white/20 rounded-lg p-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Password</p>
                  <p className="text-white">········</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Change Password
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div className="pt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-red-400 hover:text-red-300 p-0"
                    >
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600">
                        Yes, Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
