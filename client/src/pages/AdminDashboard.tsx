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
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 sm:px-6 pt-6 pb-8 rounded-b-3xl flex items-center justify-between shadow-premium">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/80 text-xs sm:text-sm">Platform Management</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-green-700 mb-1 font-medium">Total Restaurants</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">{mockStatistics.totalRestaurants}</p>
              </div>
              <Store className="text-green-600 flex-shrink-0" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-blue-700 mb-1 font-medium">Total Customers</p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-600">{mockStatistics.totalUsers}</p>
              </div>
              <Users className="text-blue-600 flex-shrink-0" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-purple-700 mb-1 font-medium">Total Orders</p>
                <p className="text-3xl sm:text-4xl font-bold text-purple-600">{mockStatistics.totalOrders}</p>
              </div>
              <ShoppingBag className="text-purple-600 flex-shrink-0" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-emerald-700 mb-1 font-medium">Total Revenue</p>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">${mockStatistics.totalRevenue}</p>
              </div>
              <TrendingUp className="text-emerald-600 flex-shrink-0" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-yellow-700 mb-1 font-medium">Meals Saved</p>
                <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{mockStatistics.totalMealsSaved}</p>
              </div>
              <ShoppingBag className="text-yellow-600 flex-shrink-0" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-green-700 mb-1 font-medium">Waste Prevented</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{mockStatistics.totalFoodWastePrevented} kg</p>
              </div>
              <Leaf className="text-green-600 flex-shrink-0" size={28} />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Users Management */}
          <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-soft">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Users Management</h3>
            <div className="space-y-2 sm:space-y-3 mb-4">
              {mockUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-xl">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base line-clamp-1">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-primary text-primary-foreground rounded-lg whitespace-nowrap ml-2">
                    Active
                  </span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setLocation('/admin-users')}
              variant="outline"
              className="w-full rounded-xl py-2 text-sm sm:text-base"
            >
              View All Users
            </Button>
          </div>

          {/* Restaurants Management */}
          <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-soft">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Restaurants Management</h3>
            <div className="space-y-2 sm:space-y-3 mb-4">
              {mockRestaurants.slice(0, 3).map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-xl">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base line-clamp-1">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{restaurant.category}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg whitespace-nowrap ml-2">
                    Approved
                  </span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setLocation('/admin-restaurants')}
              variant="outline"
              className="w-full rounded-xl py-2 text-sm sm:text-base"
            >
              View All Restaurants
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Button
            onClick={() => setLocation('/admin-users')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            Manage Users
          </Button>
          <Button
            onClick={() => setLocation('/admin-restaurants')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            Manage Restaurants
          </Button>
          <Button
            variant="outline"
            className="font-bold py-3 sm:py-4 rounded-2xl text-sm sm:text-base"
            size="lg"
          >
            View Statistics
          </Button>
        </div>
      </div>
    </div>
  );
}
