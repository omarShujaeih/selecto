import { mockRestaurants } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminRestaurants() {
  const [, setLocation] = useLocation();

  const handleApprove = (restaurantId: string) => {
    toast.success('Restaurant approved');
  };

  const handleReject = (restaurantId: string) => {
    toast.error('Restaurant rejected');
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/admin')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Restaurants Management</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {mockRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{restaurant.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 capitalize">{restaurant.category}</p>
                  <p className="text-sm text-muted-foreground mb-3">{restaurant.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                      ⭐ {restaurant.rating}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                      Approved
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center">
                  <button
                    onClick={() => handleApprove(restaurant.id)}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(restaurant.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <Button
          onClick={() => setLocation('/admin')}
          variant="outline"
          className="w-full mt-6"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
