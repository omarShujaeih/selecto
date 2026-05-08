import { mockRestaurantStats, mockOrders } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, TrendingUp, Leaf, Star, LogOut } from 'lucide-react';

export default function RestaurantDashboard() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 sm:px-6 pt-6 pb-8 rounded-b-3xl flex items-center justify-between shadow-premium">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Restaurant Hub</h1>
          <p className="text-white/80 text-xs sm:text-sm">Manage your surplus meals</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
          {/* Meals Sold */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-green-700 mb-1 font-medium">Meals Sold</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">{mockRestaurantStats.totalMealsSold}</p>
              </div>
              <TrendingUp className="text-green-600 flex-shrink-0" size={28} />
            </div>
            <p className="text-xs text-green-600">This month</p>
          </div>

          {/* Revenue Recovered */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-blue-700 mb-1 font-medium">Revenue Recovered</p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-600">${mockRestaurantStats.totalRevenueRecovered}</p>
              </div>
              <TrendingUp className="text-blue-600 flex-shrink-0" size={28} />
            </div>
            <p className="text-xs text-blue-600">Total recovered</p>
          </div>

          {/* Food Waste Prevented */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-yellow-700 mb-1 font-medium">Food Waste Prevented</p>
                <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{mockRestaurantStats.foodWastePrevented} kg</p>
              </div>
              <Leaf className="text-yellow-600 flex-shrink-0" size={28} />
            </div>
            <p className="text-xs text-yellow-600">Total prevented</p>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-purple-700 mb-1 font-medium">Average Rating</p>
                <p className="text-3xl sm:text-4xl font-bold text-purple-600">{mockRestaurantStats.averageRating}</p>
              </div>
              <Star className="text-purple-600 fill-purple-600 flex-shrink-0" size={28} />
            </div>
            <p className="text-xs text-purple-600">Customer satisfaction</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
          <Button
            onClick={() => setLocation('/add-meal')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2"
            size="lg"
          >
            <Plus size={20} />
            Add Meal
          </Button>
          <Button
            onClick={() => setLocation('/manage-meals')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            Manage Meals
          </Button>
          <Button
            onClick={() => setLocation('/restaurant-orders')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            Incoming Orders
          </Button>
          <Button
            onClick={() => setLocation('/monthly-report')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            Monthly Report
          </Button>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-soft">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-2 sm:space-y-3">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-xl hover:bg-muted transition-colors">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm sm:text-base line-clamp-1">{order.items[0]?.meal.name}</p>
                  <p className="text-xs text-muted-foreground">Order #{order.id.slice(-4)}</p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <p className="font-bold text-primary text-sm sm:text-base">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground capitalize">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
