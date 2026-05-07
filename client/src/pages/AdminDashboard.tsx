import { mockStatistics, mockRestaurants, mockUsers } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Users, Store, ShoppingBag, TrendingUp, Leaf } from 'lucide-react';

export default function AdminDashboard() {
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
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white/80 text-sm">Platform Management</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Restaurants</p>
                <p className="text-4xl font-bold text-primary">{mockStatistics.totalRestaurants}</p>
              </div>
              <Store className="text-primary" size={32} />
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-600 mb-1">Total Customers</p>
                <p className="text-4xl font-bold text-blue-600">{mockStatistics.totalUsers}</p>
              </div>
              <Users className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-purple-600 mb-1">Total Orders</p>
                <p className="text-4xl font-bold text-purple-600">{mockStatistics.totalOrders}</p>
              </div>
              <ShoppingBag className="text-purple-600" size={32} />
            </div>
          </div>

          <div className="bg-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-green-600 mb-1">Total Revenue</p>
                <p className="text-4xl font-bold text-green-600">${mockStatistics.totalRevenue}</p>
              </div>
              <TrendingUp className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-yellow-600 mb-1">Meals Saved</p>
                <p className="text-4xl font-bold text-yellow-600">{mockStatistics.totalMealsSaved}</p>
              </div>
              <ShoppingBag className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-green-600 mb-1">Food Waste Prevented</p>
                <p className="text-3xl font-bold text-green-600">{mockStatistics.totalFoodWastePrevented} kg</p>
              </div>
              <Leaf className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Users Management */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Users Management</h3>
            <div className="space-y-3 mb-4">
              {mockUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-primary text-primary-foreground rounded">
                    Active
                  </span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setLocation('/admin-users')}
              variant="outline"
              className="w-full"
            >
              View All Users
            </Button>
          </div>

          {/* Restaurants Management */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Restaurants Management</h3>
            <div className="space-y-3 mb-4">
              {mockRestaurants.slice(0, 3).map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{restaurant.category}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                    Approved
                  </span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setLocation('/admin-restaurants')}
              variant="outline"
              className="w-full"
            >
              View All Restaurants
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => setLocation('/admin-users')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6"
            size="lg"
          >
            Manage Users
          </Button>
          <Button
            onClick={() => setLocation('/admin-restaurants')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6"
            size="lg"
          >
            Manage Restaurants
          </Button>
          <Button
            variant="outline"
            className="font-bold py-6"
            size="lg"
          >
            View Statistics
          </Button>
        </div>
      </div>
    </div>
  );
}
