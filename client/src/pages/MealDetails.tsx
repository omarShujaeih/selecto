import { useState } from 'react';
import { mockMeals } from '@/data/mockData';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Clock, Minus, Plus, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function MealDetails() {
  const [location, setLocation] = useLocation();
  const { addItem } = useCart();
  const mealId = location.split('/')[2];
  const meal = mockMeals.find((m) => m.id === mealId);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!meal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Meal not found</p>
          <Button onClick={() => setLocation('/home')} className="bg-primary hover:bg-primary/90 rounded-xl py-3">
            Back to Home
          </Button>
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
    <div className="min-h-screen bg-background pb-32 sm:pb-12">
      {/* Image */}
      <div className="relative w-full h-64 sm:h-96 bg-muted overflow-hidden">
        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 z-10">
          <button
            onClick={() => setLocation('/home')}
            className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors shadow-md"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors shadow-md"
          >
            <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'} />
          </button>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-20 right-4 sm:top-24 sm:right-6 bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          -{discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6 max-w-2xl mx-auto">
        {/* Restaurant Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">{meal.restaurantName}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground line-clamp-2">{meal.name}</h1>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg ml-2 flex-shrink-0">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-yellow-700 text-sm">{meal.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">{meal.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-secondary rounded-2xl p-3 sm:p-4">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Distance</p>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <p className="font-bold text-foreground text-sm">{meal.distance} km</p>
            </div>
          </div>
          <div className="bg-secondary rounded-2xl p-3 sm:p-4">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Pickup Time</p>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary flex-shrink-0" />
              <p className="font-bold text-foreground text-sm">{meal.pickupTime}</p>
            </div>
          </div>
          <div className="bg-secondary rounded-2xl p-3 sm:p-4">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Available</p>
            <p className="font-bold text-foreground text-lg">{meal.quantity}</p>
          </div>
          <div className="bg-secondary rounded-2xl p-3 sm:p-4">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Category</p>
            <p className="font-bold text-foreground text-sm capitalize">{meal.category}</p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient) => (
              <span key={ingredient} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Food Safety & Allergens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-bold text-foreground mb-3 text-sm sm:text-base">Food Safety</h3>
            <div className="space-y-2">
              {meal.foodSafetyLabels.map((label) => (
                <p key={label} className="text-xs sm:text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  ✓ {label}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3 text-sm sm:text-base">Allergens</h3>
            <div className="space-y-2">
              {meal.allergens.length > 0 ? (
                meal.allergens.map((allergen) => (
                  <p key={allergen} className="text-xs sm:text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                    ⚠ {allergen}
                  </p>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  ✓ No allergens
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 sm:p-6 mb-6 shadow-soft">
          <p className="text-xs sm:text-sm text-green-700 mb-2 font-medium">Price</p>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs sm:text-sm text-green-600 line-through">${meal.originalPrice.toFixed(2)}</span>
            <span className="text-4xl sm:text-5xl font-bold text-green-600">${meal.discountedPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs text-green-600">You save ${(meal.originalPrice - meal.discountedPrice).toFixed(2)}</p>
        </div>

        {/* Quantity Selector */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-soft">
          <p className="text-sm font-bold text-foreground mb-4">Select Quantity</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="text-2xl font-bold text-foreground w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(meal.quantity, quantity + 1))}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 mb-6 shadow-soft">
          <p className="text-sm font-bold text-green-900 mb-2">Environmental Impact</p>
          <p className="text-xs sm:text-sm text-green-800">
            By reserving this meal, you'll help save <span className="font-bold">{(quantity * 0.5).toFixed(1)} kg</span> of food waste!
          </p>
        </div>

        {/* Pickup Deadline Warning */}
        <div className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-xs sm:text-sm text-yellow-800 mb-6">
          <p className="font-bold mb-1">Pickup Deadline: {meal.pickupDeadline}</p>
          <p>Make sure to pick up your order before this time!</p>
        </div>

        {/* Add to Cart Button - Fixed at bottom on mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 sm:p-6 shadow-premium sm:static sm:border-0 sm:shadow-none">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-base sm:text-lg"
              size="lg"
            >
              Add to Cart - ${(meal.discountedPrice * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
