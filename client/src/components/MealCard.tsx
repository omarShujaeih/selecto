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
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setLocation(`/meal/${meal.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-40 bg-muted overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
          -{discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Restaurant & Rating */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-muted-foreground">{meal.restaurantName}</p>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{meal.rating}</span>
          </div>
        </div>

        {/* Meal Name */}
        <h3 className="font-bold text-foreground mb-1 line-clamp-2">{meal.name}</h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{meal.description}</p>

        {/* Distance & Pickup Time */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <MapPin size={14} />
          <span>{meal.distance} km</span>
          <span>•</span>
          <span>{meal.pickupTime}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground line-through">${meal.originalPrice.toFixed(2)}</span>
          <span className="text-lg font-bold text-primary">${meal.discountedPrice.toFixed(2)}</span>
        </div>

        {/* Reserve Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onReserve?.(meal);
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}
