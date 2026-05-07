import { mockMeals } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageMeals() {
  const [, setLocation] = useLocation();

  const handleEdit = (mealId: string) => {
    toast.info('Edit feature coming soon');
  };

  const handleDelete = (mealId: string) => {
    toast.success('Meal deleted');
  };

  const handleToggle = (mealId: string) => {
    toast.success('Meal status updated');
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
        <h1 className="text-lg font-bold flex-1 text-center">Manage Meals</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* Add New Button */}
        <Button
          onClick={() => setLocation('/add-meal')}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 mb-6"
          size="lg"
        >
          + Add New Meal
        </Button>

        {/* Meals List */}
        <div className="space-y-3">
          {mockMeals.slice(0, 3).map((meal) => (
            <div key={meal.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{meal.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{meal.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      ${meal.originalPrice.toFixed(2)} → ${meal.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">Qty: {meal.quantity}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      Active
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(meal.id)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggle(meal.id)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
