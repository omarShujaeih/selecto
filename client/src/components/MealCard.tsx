import { Meal } from '@/data/mockData';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

interface MealCardProps {
  meal: Meal;
  onReserve?: (meal: Meal) => void;
}

export default function MealCard({ meal, onReserve }: MealCardProps) {
  const [, setLocation] = useLocation();
  
  const discountPercentage = Math.round(
    ((meal.originalPrice - meal.discountedPrice) / meal.originalPrice) * 100
  );

  return (
    <div 
      className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all cursor-pointer active:scale-95"
      onClick={() => setLocation(`/meal/${meal.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 bg-muted overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          -{discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Restaurant & Rating */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground">{meal.restaurantName}</p>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm font-bold text-yellow-700">{meal.rating}</span>
          </div>
        </div>

        {/* Meal Name */}
        <h3 className="font-bold text-foreground mb-1 line-clamp-2 text-sm sm:text-base">{meal.name}</h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{meal.description}</p>

        {/* Distance & Pickup Time */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
          <MapPin size={14} />
          <span>{meal.distance} km</span>
          <span>•</span>
          <span className="line-clamp-1">{meal.pickupTime}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs sm:text-sm text-muted-foreground line-through">${meal.originalPrice.toFixed(2)}</span>
          <span className="text-lg sm:text-xl font-bold text-primary">${meal.discountedPrice.toFixed(2)}</span>
        </div>

        {/* Reserve Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onReserve?.(meal);
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 sm:py-3 rounded-xl text-sm sm:text-base"
          size="sm"
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}
