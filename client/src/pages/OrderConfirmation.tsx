import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MapPin } from 'lucide-react';

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Success Icon */}
      <div className="mb-6">
        <CheckCircle className="text-primary" size={80} />
      </div>

      {/* Success Message */}
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-sm">
        Your order has been successfully placed. You'll receive updates about your order status.
      </p>

      {/* Order Details Card */}
      <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full mb-6">
        <div className="space-y-4">
          {/* Order ID */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Order ID</p>
            <p className="font-bold text-foreground">#ORD-2025-05-07-001</p>
          </div>

          {/* Pickup Time */}
          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <Clock className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-medium text-foreground">Pickup Time</p>
              <p className="text-sm text-muted-foreground">Today, 7:30 PM - 8:00 PM</p>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="flex items-start gap-3">
            <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-medium text-foreground">Pickup Location</p>
              <p className="text-sm text-muted-foreground">Al-Aqsa Bakery, Main Street</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-sm w-full mb-8">
        <p className="text-sm text-green-900">
          <span className="font-bold">Great job!</span> You helped save <span className="font-bold">2.5 kg</span> of food waste today.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-sm w-full">
        <Button
          onClick={() => setLocation('/orders')}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
          size="lg"
        >
          View My Orders
        </Button>
        <Button
          onClick={() => setLocation('/home')}
          variant="outline"
          className="w-full"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
