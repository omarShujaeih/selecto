import { useState } from 'react';
import { mockMeals, mockStatistics, Meal } from '@/data/mockData';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import MealCard from '@/components/MealCard';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Leaf } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'bakeries', label: 'Bakeries' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'cafes', label: 'Cafés' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'meals', label: 'Meals' },
  ];

  const filteredMeals = mockMeals.filter((meal) => {
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReserve = (meal: Meal) => {
    addItem(meal, 1);
    toast.success(`${meal.name} added to cart!`);
  };

  if (!user) {
    setLocation('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-white px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Leaf size={28} />
            <h1 className="text-2xl font-bold">Selecto</h1>
          </div>
          <button
            onClick={() => setLocation('/cart')}
            className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-white/60" size={20} />
          <Input
            type="text"
            placeholder="Search meals or restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 text-white placeholder:text-white/60 border-white/30"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-6 mt-6 grid grid-cols-3 gap-3">
        <div className="bg-primary/10 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Meals Saved</p>
          <p className="text-lg font-bold text-primary">{mockStatistics.totalMealsSaved}</p>
        </div>
        <div className="bg-blue-100 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">This Month</p>
          <p className="text-lg font-bold text-blue-600">{mockStatistics.thisMonth}</p>
        </div>
        <div className="bg-purple-100 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Users</p>
          <p className="text-lg font-bold text-purple-600">{mockStatistics.totalUsers}</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 mt-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Meals Grid */}
      <div className="px-6 mb-6">
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onReserve={handleReserve} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No meals found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
