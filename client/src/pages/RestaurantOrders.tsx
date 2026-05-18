import { useState } from 'react';
import { mockOrders } from '@/data/mockData';
import { useLocation } from 'wouter';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function RestaurantOrders() {
  const [, setLocation] = useLocation();
  const { addNotification } = useNotifications();
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusUpdate = (orderId: string, newStatus: string, orderItem: any) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    
    addNotification({
      type: 'order_status',
      title: `Order ${orderId.slice(-4)} Updated`,
      message: `Order status changed to ${newStatus}. Customer will be notified.`,
      orderId,
    });
    
    toast.success(`Order status updated to ${newStatus}`);
  };

  const statusOptions = ['pending', 'confirmed', 'ready', 'completed', 'cancelled'];

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
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/restaurant-dashboard')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Incoming Orders</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Order #{order.id.slice(-4)}</p>
                  <h3 className="font-bold text-foreground">{order.items[0]?.meal.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium text-foreground">Customer Name</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium text-foreground">{order.items[0]?.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Option</span>
                  <span className="font-medium text-foreground capitalize">{order.deliveryOption}</span>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value, order.items[0])}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
