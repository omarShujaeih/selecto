import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function AddMeal() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'meals',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    pickupTime: '',
    foodSafetyLabel: '',
    allergens: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.originalPrice && formData.discountedPrice) {
      toast.success('Meal added successfully!');
      setLocation('/manage-meals');
    } else {
      toast.error('Please fill in all required fields');
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
        <h1 className="text-lg font-bold flex-1 text-center">Add Surplus Meal</h1>
        <div className="w-10" />
      </div>

      {/* Form */}
      <div className="px-6 py-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Meal Name *</label>
            <Input
              type="text"
              name="name"
              placeholder="e.g., Mixed Pastries Box"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Describe your meal..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="meals">Meals</option>
              <option value="bakeries">Bakeries</option>
              <option value="cafes">Cafés</option>
              <option value="sweets">Sweets</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Meal Image</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="mx-auto text-muted-foreground mb-2" size={32} />
              <p className="text-sm text-muted-foreground">Click to upload image</p>
            </div>
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Original Price ($) *</label>
            <Input
              type="number"
              name="originalPrice"
              placeholder="12.00"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full"
              step="0.01"
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Discounted Price ($) *</label>
            <Input
              type="number"
              name="discountedPrice"
              placeholder="4.00"
              value={formData.discountedPrice}
              onChange={handleChange}
              className="w-full"
              step="0.01"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
            <Input
              type="number"
              name="quantity"
              placeholder="5"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Pickup Time Slot</label>
            <Input
              type="text"
              name="pickupTime"
              placeholder="e.g., 7:00 PM - 10:00 PM"
              value={formData.pickupTime}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Food Safety Label */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Food Safety Label</label>
            <Input
              type="text"
              name="foodSafetyLabel"
              placeholder="e.g., Fresh today, Contains dairy"
              value={formData.foodSafetyLabel}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Allergens</label>
            <Input
              type="text"
              name="allergens"
              placeholder="e.g., Gluten, Dairy, Nuts"
              value={formData.allergens}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 mt-6"
            size="lg"
          >
            Activate Listing
          </Button>
        </form>
      </div>
    </div>
  );
}
