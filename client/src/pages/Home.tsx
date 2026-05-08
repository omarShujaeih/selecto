import { useState } from 'react';
import { mockMeals, mockStatistics, Meal } from '@/data/mockData';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import MealCard from '@/components/MealCard';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Leaf, X } from 'lucide-react';
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
      <div className="sticky top-0 z-20 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 rounded-b-3xl shadow-premium">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Leaf size={28} />
            <h1 className="text-2xl sm:text-3xl font-bold">Selecto</h1>
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
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 text-white placeholder:text-white/60 border-white/30 rounded-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 sm:px-6 mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 sm:p-4 text-center shadow-soft">
          <p className="text-xs sm:text-sm text-green-700 mb-1 font-medium">Meals Saved</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{mockStatistics.totalMealsSaved}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 sm:p-4 text-center shadow-soft">
          <p className="text-xs sm:text-sm text-blue-700 mb-1 font-medium">This Month</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{mockStatistics.thisMonth}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 sm:p-4 text-center shadow-soft">
          <p className="text-xs sm:text-sm text-purple-700 mb-1 font-medium">Users</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{mockStatistics.totalUsers}</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 sm:px-6 mt-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm sm:text-base ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Meals Grid */}
      <div className="px-4 sm:px-6 mb-6">
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onReserve={handleReserve} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">No meals found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
