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
      <div className="bg-gradient-to-b from-primary to-primary/90 text-white px-6 pt-6 pb-8 rounded-b-3xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
          <p className="text-white/80 text-sm">Manage your surplus meals</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Meals Sold */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Meals Sold</p>
                <p className="text-4xl font-bold text-primary">{mockRestaurantStats.totalMealsSold}</p>
              </div>
              <TrendingUp className="text-primary" size={32} />
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>

          {/* Revenue Recovered */}
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-600 mb-1">Revenue Recovered</p>
                <p className="text-4xl font-bold text-blue-600">${mockRestaurantStats.totalRevenueRecovered}</p>
              </div>
              <TrendingUp className="text-blue-600" size={32} />
            </div>
            <p className="text-xs text-blue-600">Total recovered</p>
          </div>

          {/* Food Waste Prevented */}
          <div className="bg-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-green-600 mb-1">Food Waste Prevented</p>
                <p className="text-4xl font-bold text-green-600">{mockRestaurantStats.foodWastePrevented} kg</p>
              </div>
              <Leaf className="text-green-600" size={32} />
            </div>
            <p className="text-xs text-green-600">Total prevented</p>
          </div>

          {/* Average Rating */}
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-yellow-600 mb-1">Average Rating</p>
                <p className="text-4xl font-bold text-yellow-600">{mockRestaurantStats.averageRating}</p>
              </div>
              <Star className="text-yellow-600 fill-yellow-600" size={32} />
            </div>
            <p className="text-xs text-yellow-600">Customer satisfaction</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={() => setLocation('/add-meal')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg"
            size="lg"
          >
            <Plus size={24} className="mr-2" />
            Add Surplus Meal
          </Button>
          <Button
            onClick={() => setLocation('/manage-meals')}
            variant="outline"
            className="font-bold py-6 text-lg"
            size="lg"
          >
            Manage Meals
          </Button>
          <Button
            onClick={() => setLocation('/restaurant-orders')}
            variant="outline"
            className="font-bold py-6 text-lg"
            size="lg"
          >
            View Orders
          </Button>
          <Button
            onClick={() => setLocation('/monthly-report')}
            variant="outline"
            className="font-bold py-6 text-lg"
            size="lg"
          >
            Monthly Report
          </Button>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{order.items[0]?.meal.name}</p>
                  <p className="text-xs text-muted-foreground">Order #{order.id.slice(-4)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${order.totalPrice.toFixed(2)}</p>
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
