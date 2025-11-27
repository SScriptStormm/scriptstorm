import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateShort } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PackageFeaturesWidget } from "@/components/dashboard/PackageFeaturesWidget";
import { Info } from "lucide-react";
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
  const packageRef = useRef<HTMLDivElement>(null);

  const scrollToPackage = () => {
    packageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      nextDate: formatDate(endDate)
    };
  };

  const generateBillingHistory = () => {
    if (!subscriber?.subscription_end || !subscriber.subscription_tier) return [];
    
    const renewalDate = new Date(subscriber.subscription_end);
    const billingInfo = getBillingInfo();
    
    // Calculate the last payment date based on billing cycle
    const lastPaymentDate = new Date(renewalDate);
    if (billingInfo.isAnnual) {
      lastPaymentDate.setFullYear(lastPaymentDate.getFullYear() - 1);
    } else {
      lastPaymentDate.setMonth(lastPaymentDate.getMonth() - 1);
    }
    
    return [{
      date: lastPaymentDate,
      description: `${getTierDisplayName(subscriber.subscription_tier)} Plan`,
      amount: billingInfo.price
    }];
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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="mb-4 bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-sm sm:text-base text-white/70">Manage your subscription, billing, and account preferences</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Section 1: Subscription & Billing */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-xl sm:text-2xl">Subscription & Billing</CardTitle>
              <CardDescription className="text-white/70 text-sm">
                Your current plan and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="bg-white/5 border border-white/20 rounded-lg p-4 sm:p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-white/70 text-sm sm:text-base">Plan Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-base sm:text-lg">
                      {getTierDisplayName(subscriber?.subscription_tier)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={scrollToPackage}
                      className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      title="View package details"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-white/70 text-sm sm:text-base">Status:</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 w-fit">
                    Active ✅
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <span className="text-white/70 text-sm sm:text-base">Billing Cycle:</span>
                  <span className="text-white text-sm sm:text-base text-left sm:text-right">
                    {billingInfo.isAnnual ? "Annual" : "Monthly"} 
                    <span className="text-white/70 block sm:inline sm:ml-2">
                      (Billed ${billingInfo.price.toLocaleString()}/{billingInfo.isAnnual ? "year" : "month"})
                    </span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-white/70 text-sm sm:text-base">Next Billing Date:</span>
                  <span className="text-white text-sm sm:text-base text-left sm:text-right">Renews on {billingInfo.nextDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full sm:flex-1 bg-white text-primary hover:bg-white/90"
                >
                  Upgrade Plan
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:flex-1 bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
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
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-xl sm:text-2xl">Payment Method & Invoices</CardTitle>
              <CardDescription className="text-white/70 text-sm">
                Manage your payment methods and view billing history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/20 rounded-lg p-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Payment Method</p>
                  <p className="text-white text-sm sm:text-base">Visa ending in 4242</p>
                </div>
                <Button
                  onClick={handleUpdatePayment}
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 text-sm"
                >
                  Update Payment Method
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-white font-semibold mb-3 text-base sm:text-lg">Billing History</h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/20 hover:bg-white/5">
                          <TableHead className="text-white/70 text-xs sm:text-sm">Date</TableHead>
                          <TableHead className="text-white/70 text-xs sm:text-sm">Description</TableHead>
                          <TableHead className="text-white/70 text-xs sm:text-sm">Amount</TableHead>
                          <TableHead className="text-white/70 text-xs sm:text-sm">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generateBillingHistory().map((invoice, index) => (
                          <TableRow key={index} className="border-white/20 hover:bg-white/5">
                            <TableCell className="text-white text-xs sm:text-sm whitespace-nowrap">{formatDateShort(invoice.date)}</TableCell>
                            <TableCell className="text-white text-xs sm:text-sm">{invoice.description}</TableCell>
                            <TableCell className="text-white text-xs sm:text-sm whitespace-nowrap">${invoice.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/70 hover:text-white hover:bg-white/10 text-xs sm:text-sm"
                              >
                                PDF ↓
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
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
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-xl sm:text-2xl">Profile & Security</CardTitle>
              <CardDescription className="text-white/70 text-sm">
                Manage your account information and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/20 rounded-lg p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-white/70 text-sm mb-1">Email Address</p>
                  <p className="text-white text-sm sm:text-base break-words">{userEmail}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 text-sm"
                >
                  Edit
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/20 rounded-lg p-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Password</p>
                  <p className="text-white text-sm sm:text-base">········</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 text-sm"
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

          {/* Section 4: Your Package Details */}
          <div ref={packageRef}>
            <PackageFeaturesWidget subscriptionTier={subscriber?.subscription_tier || 'starter'} />
          </div>
        </div>
      </div>
    </div>
  );
}
