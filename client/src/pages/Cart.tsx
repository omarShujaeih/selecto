import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">Add some delicious meals to get started</p>
          <Button onClick={() => setLocation('/home')} className="bg-primary hover:bg-primary/90 rounded-xl py-3">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => setLocation('/home')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Shopping Cart</h1>
        <div className="w-10" />
      </div>

      {/* Cart Items */}
      <div className="px-4 sm:px-6 py-6">
        <div className="space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div key={item.mealId} className="bg-card rounded-2xl p-4 border border-border shadow-soft">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.meal.image}
                    alt={item.meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1 line-clamp-2 text-sm sm:text-base">{item.meal.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.meal.restaurantName}</p>
                  <p className="text-base sm:text-lg font-bold text-primary">
                    ${(item.meal.discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.mealId)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 flex-shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Quantity</span>
                <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.mealId, item.quantity - 1)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.mealId, item.quantity + 1)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 sm:p-6 shadow-premium">
        <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center text-base sm:text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary text-xl sm:text-2xl">${getTotalPrice().toFixed(2)}</span>
          </div>

          <Button
            onClick={() => setLocation('/checkout')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg"
            size="lg"
          >
            Proceed to Checkout
          </Button>

          <Button
            onClick={() => setLocation('/home')}
            variant="outline"
            className="w-full rounded-xl py-3"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
