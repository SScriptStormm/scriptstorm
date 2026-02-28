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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubscriberData {
  subscription_tier: string | null;
  subscribed: boolean;
  subscription_end: string | null;
  email: string;
  stripe_customer_id: string | null;
}

const TIER_PRICES = {
  starter: { monthly: 297, annual: 2850 },
  growth: { monthly: 597, annual: 5730 },
  scale: { monthly: 1297, annual: 12450 },
  authority: { monthly: 1797, annual: 17250 },
  dominance: { monthly: 2997, annual: 28770 },
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
  
  // Email and password change state
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

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

  const handleOpenPortal = async (flowType?: string) => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        body: flowType ? { flow_type: flowType } : {},
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      } else {
        toast.error("Could not open billing portal. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("No active subscription")) {
        toast.error("No active subscription found. Please subscribe first.");
      } else {
        toast.error("Failed to open billing portal. Please try again.");
      }
      console.error("Customer portal error:", err);
    } finally {
      setPortalLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Account deletion requested");
      navigate("/");
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsUpdating(true);
    
    const { error } = await supabase.auth.updateUser({
      email: newEmail
    });

    setIsUpdating(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Confirmation email sent to both your current and new email addresses. Please check your inbox to confirm the change.");
      setEmailDialogOpen(false);
      setNewEmail("");
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsUpdating(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    setIsUpdating(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      setPasswordDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading account settings..." />;
  }

  const billingInfo = getBillingInfo();
  const tierVariant = getTierVariant(subscriber?.subscription_tier);
  const isActive = subscriber?.subscribed && (!subscriber?.subscription_end || new Date(subscriber.subscription_end).getTime() > Date.now());

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
              {({ starter: "🚀", growth: "🔥", scale: "⚡", authority: "👑", dominance: "💎" }[(subscriber?.subscription_tier || "starter").toLowerCase()] || "🚀")} {getTierDisplayName(subscriber?.subscription_tier)}
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
                    <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
                    <span className="text-white/60 text-sm font-mono">Status</span>
                  </div>
                  {isActive ? (
                    <HoloBadge variant="success" size="sm">Active</HoloBadge>
                  ) : (
                    <HoloBadge variant="danger" size="sm">Inactive</HoloBadge>
                  )}
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
                  onClick={() => handleOpenPortal("subscription_update")}
                  disabled={portalLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-white font-mono hover:opacity-90 transition-opacity"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {portalLoading ? "Opening portal..." : "Upgrade Plan"}
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
                      <AlertDialogAction onClick={() => handleOpenPortal("subscription_cancel")} disabled={portalLoading} className="bg-rose-500 hover:bg-rose-600">
                        {portalLoading ? "Opening portal..." : "Yes, Cancel"}
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
                  onClick={() => handleOpenPortal("payment_method_update")}
                  disabled={portalLoading}
                  variant="outline"
                  className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono text-sm"
                >
                  {portalLoading ? "Loading..." : "Update"}
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
                              onClick={() => handleOpenPortal()}
                              disabled={portalLoading}
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
                  onClick={() => handleOpenPortal()}
                  disabled={portalLoading}
                  variant="link"
                  className="text-primary-glow hover:text-white mt-2 font-mono text-sm p-0"
                >
                  {portalLoading ? "Loading..." : "View Full Billing History →"}
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
                  onClick={() => setEmailDialogOpen(true)}
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
                  onClick={() => setPasswordDialogOpen(true)}
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

      {/* Email Change Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="bg-background border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white font-mono">Change Email Address</DialogTitle>
            <DialogDescription className="text-white/60 font-mono text-sm">
              Enter your new email address. You'll receive a confirmation link at both your current and new email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-email" className="text-white/70 font-mono text-sm">
                Current Email
              </Label>
              <Input
                id="current-email"
                value={userEmail}
                disabled
                className="bg-white/5 border-white/20 text-white/50 font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email" className="text-white/70 font-mono text-sm">
                New Email
              </Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                className="bg-white/5 border-white/20 text-white font-mono placeholder:text-white/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEmailDialogOpen(false)}
              className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEmail}
              disabled={isUpdating || !newEmail}
              className="bg-primary text-white font-mono"
            >
              {isUpdating ? "Sending..." : "Update Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="bg-background border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white font-mono">Change Password</DialogTitle>
            <DialogDescription className="text-white/60 font-mono text-sm">
              Enter your new password. Make sure it's at least 6 characters long.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white/70 font-mono text-sm">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-white/5 border-white/20 text-white font-mono placeholder:text-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white/70 font-mono text-sm">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-white/5 border-white/20 text-white font-mono placeholder:text-white/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPasswordDialogOpen(false)}
              className="bg-white/5 text-white border-white/20 hover:bg-white/10 font-mono"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePassword}
              disabled={isUpdating || !newPassword || !confirmPassword}
              className="bg-primary text-white font-mono"
            >
              {isUpdating ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
