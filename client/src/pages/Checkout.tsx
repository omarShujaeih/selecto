import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, getTotalPrice, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Cart is Empty</h2>
          <Button onClick={() => setLocation('/home')} className="bg-primary hover:bg-primary/90 rounded-xl py-3">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const foodWastePrevented = (items.length * 0.5).toFixed(1);

  const handleConfirmOrder = () => {
    const orderId = `order-${Date.now()}`;
    toast.success('Order confirmed! Check your orders page.');
    clearCart();
    setLocation(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => setLocation('/cart')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Checkout</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6 max-w-md mx-auto">
        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border mb-6 shadow-soft">
          <h2 className="font-bold text-foreground mb-4 text-base sm:text-lg">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b border-border">
            {items.map((item) => (
              <div key={item.mealId} className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {item.meal.name} x {item.quantity}
                </span>
                <span className="font-medium text-foreground">
                  ${(item.meal.discountedPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-base sm:text-lg">
            <span>Total:</span>
            <span className="text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Option */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border mb-6 shadow-soft">
          <h2 className="font-bold text-foreground mb-4 text-base sm:text-lg">Delivery Option</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 sm:p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary transition-colors">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={() => setDeliveryOption('pickup')}
                className="w-5 h-5 cursor-pointer"
              />
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Pickup</p>
                <p className="text-xs text-muted-foreground">Pick up at the restaurant</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 sm:p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary transition-colors">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryOption === 'delivery'}
                onChange={() => setDeliveryOption('delivery')}
                className="w-5 h-5 cursor-pointer"
              />
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Delivery</p>
                <p className="text-xs text-muted-foreground">Deliver to my address</p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border mb-6 shadow-soft">
          <h2 className="font-bold text-foreground mb-4 text-base sm:text-lg">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 sm:p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary transition-colors">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="w-5 h-5 cursor-pointer"
              />
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard, etc.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 sm:p-4 border border-border rounded-xl cursor-pointer hover:bg-secondary transition-colors">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="w-5 h-5 cursor-pointer"
              />
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Cash on Pickup</p>
                <p className="text-xs text-muted-foreground">Pay when you pick up</p>
              </div>
            </label>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 mb-6 shadow-soft">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-green-900 mb-1 text-sm sm:text-base">Environmental Impact</p>
              <p className="text-xs sm:text-sm text-green-800">
                You helped save <span className="font-bold">{foodWastePrevented} kg</span> of food waste!
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg"
          size="lg"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
