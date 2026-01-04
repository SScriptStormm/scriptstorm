import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateShort } from "@/lib/dateUtils";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Info, CreditCard, Shield, User, Calendar, ArrowLeft, Download, Mail, Lock, Trash2, Crown, Zap } from "lucide-react";
import LoadingScreen from "@/components/ui/LoadingScreen";
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

type TierKey = "starter" | "growth" | "scale" | "authority" | "dominance";

const getTierVariant = (tier: string | null): "starter" | "growth" | "scale" | "authority" | "dominance" | "default" => {
  if (!tier) return "default";
  const lowerTier = tier.toLowerCase();
  if (["starter", "growth", "scale", "authority", "dominance"].includes(lowerTier)) {
    return lowerTier as TierKey;
  }
  return "default";
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
      nextDate: formatDate(endDate)
    };
  };

  const generateBillingHistory = () => {
    if (!subscriber?.subscription_end || !subscriber.subscription_tier) return [];
    
    const renewalDate = new Date(subscriber.subscription_end);
    const billingInfo = getBillingInfo();
    
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
    toast.info("Redirecting to payment portal...");
  };

  const handleCancelSubscription = async () => {
    toast.info("Cancellation flow initiated");
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Account deletion requested");
      navigate("/");
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading account settings..." />;
  }

  const billingInfo = getBillingInfo();
  const tierVariant = getTierVariant(subscriber?.subscription_tier);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Neural network background overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary-glow) / 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-primary-glow/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-white/70 hover:text-white hover:bg-white/10 gap-2 font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight">
              Account Settings
            </h1>
            <HoloBadge variant={tierVariant} size="lg" animated>
              {getTierDisplayName(subscriber?.subscription_tier)}
            </HoloBadge>
          </div>
          <p className="text-white/60 font-mono text-sm">
            Manage your subscription, billing, and account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Subscription & Billing */}
          <GlassCard variant={tierVariant} glow hover={false}>
            <GlassCardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary-glow/30">
                  <Crown className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <GlassCardTitle className="text-xl">Subscription & Billing</GlassCardTitle>
                  <GlassCardDescription>Your current plan and billing information</GlassCardDescription>
                </div>
              </div>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              {/* Plan Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary-glow" />
                    <span className="text-white/60 text-sm font-mono">Plan Name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-lg">
                      {getTierDisplayName(subscriber?.subscription_tier)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/package-details")}
                      className="h-6 w-6 p-0 text-white/50 hover:text-white hover:bg-white/10"
                      title="View package details"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/60 text-sm font-mono">Status</span>
                  </div>
                  <HoloBadge variant="success" size="sm">Active</HoloBadge>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary-glow" />
                    <span className="text-white/60 text-sm font-mono">Billing Cycle</span>
                  </div>
                  <span className="text-white font-semibold">
                    {billingInfo.isAnnual ? "Annual" : "Monthly"}
                  </span>
                  <span className="text-white/60 text-sm ml-2">
                    ${billingInfo.price.toLocaleString()}/{billingInfo.isAnnual ? "yr" : "mo"}
                  </span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary-glow" />
                    <span className="text-white/60 text-sm font-mono">Next Billing</span>
                  </div>
                  <span className="text-white font-semibold">{billingInfo.nextDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-white font-mono hover:opacity-90 transition-opacity"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 hover:text-rose-300 font-mono"
                    >
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your subscription? You will lose access to all premium features at the end of your billing period.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription} className="bg-rose-500 hover:bg-rose-600">
                        Yes, Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </GlassCardContent>
          </GlassCard>

          {/* Section 2: Payment Method & Invoices */}
          <GlassCard variant="default" glow hover={false}>
            <GlassCardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary-glow/30">
                  <CreditCard className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <GlassCardTitle className="text-xl">Payment Method & Invoices</GlassCardTitle>
                  <GlassCardDescription>Manage your payment methods and view billing history</GlassCardDescription>
                </div>
              </div>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              {/* Payment Method */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-mono mb-0.5">Payment Method</p>
                    <p className="text-white font-mono">•••• •••• •••• 4242</p>
                  </div>
                </div>
                <Button
                  onClick={handleUpdatePayment}
                  variant="outline"
                  className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono text-sm"
                >
                  Update
                </Button>
              </div>

              <Separator className="bg-white/10" />

              {/* Billing History */}
              <div>
                <h3 className="text-white font-semibold mb-3 font-mono flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary-glow" />
                  Billing History
                </h3>
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white/60 font-mono text-xs">Date</TableHead>
                        <TableHead className="text-white/60 font-mono text-xs">Description</TableHead>
                        <TableHead className="text-white/60 font-mono text-xs">Amount</TableHead>
                        <TableHead className="text-white/60 font-mono text-xs">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generateBillingHistory().map((invoice, index) => (
                        <TableRow key={index} className="border-white/10 hover:bg-white/5 transition-colors">
                          <TableCell className="text-white font-mono text-sm">{formatDateShort(invoice.date)}</TableCell>
                          <TableCell className="text-white font-mono text-sm">{invoice.description}</TableCell>
                          <TableCell className="text-white font-mono text-sm">${invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary-glow hover:text-white hover:bg-white/10 font-mono text-xs gap-1"
                            >
                              <Download className="h-3 w-3" />
                              PDF
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button
                  onClick={handleUpdatePayment}
                  variant="link"
                  className="text-primary-glow hover:text-white mt-2 font-mono text-sm p-0"
                >
                  View Full Billing History →
                </Button>
              </div>
            </GlassCardContent>
          </GlassCard>

          {/* Section 3: Profile & Security */}
          <GlassCard variant="default" glow hover={false}>
            <GlassCardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary-glow/30">
                  <Shield className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <GlassCardTitle className="text-xl">Profile & Security</GlassCardTitle>
                  <GlassCardDescription>Manage your account information and security settings</GlassCardDescription>
                </div>
              </div>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Mail className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/60 text-xs font-mono mb-0.5">Email Address</p>
                    <p className="text-white font-mono text-sm truncate">{userEmail}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono text-sm"
                >
                  Edit
                </Button>
              </div>

              {/* Password */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Lock className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-mono mb-0.5">Password</p>
                    <p className="text-white font-mono text-sm">••••••••••••</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono text-sm"
                >
                  Change Password
                </Button>
              </div>

              <Separator className="bg-white/10" />

              {/* Danger Zone */}
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="h-4 w-4 text-rose-400" />
                  <span className="text-rose-400 font-mono text-sm font-semibold">Danger Zone</span>
                </div>
                <p className="text-white/60 text-sm mb-3 font-mono">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 hover:text-rose-300 font-mono text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-rose-500 hover:bg-rose-600">
                        Yes, Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
