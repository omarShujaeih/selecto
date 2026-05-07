import { mockMeals } from '@/data/mockData';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import MealCard from '@/components/MealCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function Favorites() {
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  
  // Mock favorites - in real app, would come from user profile
  const favoriteIds = ['meal-1', 'meal-5'];
  const favoriteMeals = mockMeals.filter((meal) => favoriteIds.includes(meal.id));

  const handleReserve = (meal: any) => {
    addItem(meal, 1);
    toast.success(`${meal.name} added to cart!`);
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
        <h1 className="text-lg font-bold flex-1 text-center">Favorites</h1>
        <Heart className="text-primary" size={24} />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {favoriteMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onReserve={handleReserve} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto text-muted-foreground mb-4" size={48} />
            <h2 className="text-xl font-bold text-foreground mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-6">
              Add meals to your favorites to see them here
            </p>
            <Button onClick={() => setLocation('/home')} className="bg-primary hover:bg-primary/90">
              Browse Meals
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
