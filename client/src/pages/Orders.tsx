import { useState } from 'react';
import { mockOrders } from '@/data/mockData';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Orders() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const activeOrders = mockOrders.filter((order) => order.status === 'pending' || order.status === 'confirmed' || order.status === 'ready');
  const pastOrders = mockOrders.filter((order) => order.status === 'completed' || order.status === 'cancelled');

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'ready':
        return 'Ready for Pickup';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => setLocation('/home')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">My Orders</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 sm:px-6 pt-6 mb-6 bg-secondary rounded-2xl p-1 max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-sm ${
            activeTab === 'active'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-secondary-foreground'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-sm ${
            activeTab === 'past'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-secondary-foreground'
          }`}
        >
          Past
        </button>
      </div>

      {/* Orders List */}
      <div className="px-4 sm:px-6">
        {displayOrders.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {displayOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-soft">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Order #{order.id.slice(-4)}</p>
                    <h3 className="font-bold text-foreground line-clamp-2 text-sm sm:text-base">
                      {order.items[0]?.meal.name}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                {/* Order Details */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Restaurant</span>
                    <span className="font-medium text-foreground">{order.items[0]?.meal.restaurantName}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Pickup Time</span>
                    <span className="font-medium text-foreground">{order.pickupTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg text-xs sm:text-sm"
                  >
                    Track Order
                  </Button>
                  {activeTab === 'past' && (
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 rounded-lg text-xs sm:text-sm"
                    >
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-base sm:text-lg mb-4">
              {activeTab === 'active' ? 'No active orders' : 'No past orders'}
            </p>
            <Button onClick={() => setLocation('/home')} className="bg-primary hover:bg-primary/90 rounded-xl py-3">
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
