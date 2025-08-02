import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, Mail, FileText } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      console.log("Order completed:", orderId);
      // Here you could fetch order details from your backend
      setOrderDetails({
        id: orderId,
        total: "$497/month", // This would come from your backend
        addOns: [], // This would come from your backend
      });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Welcome to ScriptStorm Premium
          </p>
        </div>

        {orderId && (
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono text-sm break-all">{orderId}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-sm">SEO Access Email</p>
              <p className="text-xs text-muted-foreground">
                SurferSEO API key sent to your email
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Priority Queue</p>
              <p className="text-xs text-muted-foreground">
                Added to native editing priority list
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          Billed monthly in USD • Cancel anytime
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Start Creating Content
        </button>
      </div>
    </div>
  );
};

export default ThankYou;