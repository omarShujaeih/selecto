import { useState } from 'react';
import { mockMeals } from '@/data/mockData';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function MealDetails() {
  const [location, setLocation] = useLocation();
  const { addItem } = useCart();
  const mealId = location.split('/')[2];
  const meal = mockMeals.find((m) => m.id === mealId);
  const [quantity, setQuantity] = useState(1);

  if (!meal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Meal not found</p>
          <Button onClick={() => setLocation('/home')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((meal.originalPrice - meal.discountedPrice) / meal.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addItem(meal, quantity);
    toast.success(`${meal.name} added to cart!`);
    setLocation('/cart');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/home')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Meal Details</h1>
        <div className="w-10" />
      </div>

      {/* Image */}
      <div className="relative h-80 bg-muted overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold">
          -{discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Restaurant & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">{meal.restaurantName}</p>
            <h2 className="text-3xl font-bold text-foreground">{meal.name}</h2>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-lg">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{meal.rating}</span>
          </div>
        </div>

        {/* Distance & Pickup */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{meal.distance} km away</span>
          </div>
          <span>•</span>
          <span>Pickup: {meal.pickupTime}</span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-bold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground">{meal.description}</p>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="font-bold text-foreground mb-2">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient) => (
              <span key={ingredient} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Food Safety & Allergens */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-bold text-foreground mb-2 text-sm">Food Safety</h3>
            <div className="space-y-1">
              {meal.foodSafetyLabels.map((label) => (
                <p key={label} className="text-xs text-muted-foreground bg-green-50 px-2 py-1 rounded">
                  ✓ {label}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2 text-sm">Allergens</h3>
            <div className="space-y-1">
              {meal.allergens.length > 0 ? (
                meal.allergens.map((allergen) => (
                  <p key={allergen} className="text-xs text-muted-foreground bg-red-50 px-2 py-1 rounded">
                    ⚠ {allergen}
                  </p>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">No allergens</p>
              )}
            </div>
          </div>
        </div>

        {/* Price & Quantity */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Original Price</p>
              <p className="text-lg line-through text-muted-foreground">${meal.originalPrice.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Your Price</p>
              <p className="text-3xl font-bold text-primary">${meal.discountedPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Quantity</span>
            <div className="flex items-center gap-3 bg-white rounded-lg p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(meal.quantity, quantity + 1))}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 text-lg"
          size="lg"
        >
          Add to Cart - ${(meal.discountedPrice * quantity).toFixed(2)}
        </Button>

        {/* Pickup Deadline Warning */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <p className="font-bold mb-1">Pickup Deadline: {meal.pickupDeadline}</p>
          <p>Make sure to pick up your order before this time!</p>
        </div>
      </div>
    </div>
  );
}
