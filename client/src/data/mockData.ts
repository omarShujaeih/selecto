export interface Restaurant {
  id: string;
  name: string;
  category: 'bakery' | 'restaurant' | 'cafe';
  rating: number;
  image: string;
  description: string;
}

export interface Meal {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category: 'bakeries' | 'restaurants' | 'cafes' | 'sweets' | 'meals';
  image: string;
  description: string;
  ingredients: string[];
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  pickupTime: string;
  pickupDeadline: string;
  distance: number;
  rating: number;
  foodSafetyLabels: string[];
  allergens: string[];
}

export interface CartItem {
  mealId: string;
  quantity: number;
  meal: Meal;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  totalPrice: number;
  pickupTime: string;
  deliveryOption: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'card';
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  foodWastePrevented: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant' | 'admin';
  phone?: string;
  address?: string;
  favorites?: string[];
}

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Al-Aqsa Bakery',
    category: 'bakery',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=500&h=500&fit=crop',
    description: 'Fresh baked goods daily',
  },
  {
    id: 'rest-2',
    name: 'Al-Reef Restaurant',
    category: 'restaurant',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    description: 'Traditional Middle Eastern cuisine',
  },
  {
    id: 'rest-3',
    name: 'Green Café',
    category: 'cafe',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop',
    description: 'Organic coffee and healthy meals',
  },
  {
    id: 'rest-4',
    name: 'Sweet House',
    category: 'bakery',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Artisan desserts and pastries',
  },
  {
    id: 'rest-5',
    name: 'Al-Manakah Bakery',
    category: 'bakery',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    description: 'Authentic Lebanese bakery',
  },
];

// Mock Meals
export const mockMeals: Meal[] = [
  {
    id: 'meal-1',
    name: 'Mixed Pastries Box',
    restaurantId: 'rest-1',
    restaurantName: 'Al-Aqsa Bakery',
    category: 'bakeries',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=500&h=500&fit=crop',
    description: 'Assorted fresh pastries including croissants, danishes, and more',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla'],
    originalPrice: 12,
    discountedPrice: 4,
    quantity: 5,
    pickupTime: '7:00 PM - 10:00 PM',
    pickupDeadline: '10:00 PM',
    distance: 0.8,
    rating: 4.8,
    foodSafetyLabels: ['Fresh today', 'Pickup before 10:00 PM'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
  },
  {
    id: 'meal-2',
    name: 'Mini Manakeesh',
    restaurantId: 'rest-5',
    restaurantName: 'Al-Manakah Bakery',
    category: 'bakeries',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
    description: 'Traditional Lebanese flatbread with zaatar and cheese',
    ingredients: ['Flour', 'Zaatar', 'Cheese', 'Olive Oil', 'Salt'],
    originalPrice: 8,
    discountedPrice: 3,
    quantity: 8,
    pickupTime: '6:00 PM - 9:00 PM',
    pickupDeadline: '9:00 PM',
    distance: 1.2,
    rating: 4.5,
    foodSafetyLabels: ['Fresh today', 'Contains dairy'],
    allergens: ['Gluten', 'Dairy'],
  },
  {
    id: 'meal-3',
    name: 'Makloubeh Meal',
    restaurantId: 'rest-2',
    restaurantName: 'Al-Reef Restaurant',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    description: 'Delicious upside-down rice and meat dish',
    ingredients: ['Rice', 'Chicken', 'Eggplant', 'Tomatoes', 'Spices'],
    originalPrice: 10,
    discountedPrice: 3.5,
    quantity: 3,
    pickupTime: '8:00 PM - 10:00 PM',
    pickupDeadline: '10:00 PM',
    distance: 1.5,
    rating: 4.6,
    foodSafetyLabels: ['Fresh today', 'Pickup before 10:00 PM'],
    allergens: [],
  },
  {
    id: 'meal-4',
    name: 'Chicken Sandwich Box',
    restaurantId: 'rest-2',
    restaurantName: 'Al-Reef Restaurant',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop',
    description: 'Grilled chicken sandwiches with fresh vegetables',
    ingredients: ['Chicken', 'Bread', 'Lettuce', 'Tomato', 'Sauce'],
    originalPrice: 9,
    discountedPrice: 3,
    quantity: 6,
    pickupTime: '7:30 PM - 9:30 PM',
    pickupDeadline: '9:30 PM',
    distance: 1.5,
    rating: 4.7,
    foodSafetyLabels: ['Fresh today', 'Contains gluten'],
    allergens: ['Gluten'],
  },
  {
    id: 'meal-5',
    name: 'Dessert Surprise Box',
    restaurantId: 'rest-4',
    restaurantName: 'Sweet House',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Mystery assortment of our finest desserts',
    ingredients: ['Chocolate', 'Sugar', 'Butter', 'Eggs', 'Vanilla'],
    originalPrice: 15,
    discountedPrice: 5,
    quantity: 4,
    pickupTime: '6:00 PM - 9:00 PM',
    pickupDeadline: '9:00 PM',
    distance: 2.0,
    rating: 4.9,
    foodSafetyLabels: ['Fresh today', 'Contains dairy'],
    allergens: ['Gluten', 'Dairy', 'Eggs', 'Nuts'],
  },
  {
    id: 'meal-6',
    name: 'Fresh Salad Bowl',
    restaurantId: 'rest-3',
    restaurantName: 'Green Café',
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    description: 'Organic mixed greens with seasonal vegetables',
    ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Carrot', 'Dressing'],
    originalPrice: 8,
    discountedPrice: 2.5,
    quantity: 7,
    pickupTime: '5:00 PM - 8:00 PM',
    pickupDeadline: '8:00 PM',
    distance: 0.5,
    rating: 4.7,
    foodSafetyLabels: ['Fresh today', 'Vegetarian option'],
    allergens: [],
  },
  {
    id: 'meal-7',
    name: 'Espresso & Pastry Combo',
    restaurantId: 'rest-3',
    restaurantName: 'Green Café',
    category: 'cafes',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop',
    description: 'Premium espresso with fresh pastry',
    ingredients: ['Coffee Beans', 'Milk', 'Flour', 'Butter', 'Sugar'],
    originalPrice: 7,
    discountedPrice: 2,
    quantity: 10,
    pickupTime: '4:00 PM - 7:00 PM',
    pickupDeadline: '7:00 PM',
    distance: 0.5,
    rating: 4.8,
    foodSafetyLabels: ['Fresh today', 'Contains dairy'],
    allergens: ['Gluten', 'Dairy'],
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    customerId: 'user-1',
    items: [
      {
        mealId: 'meal-1',
        quantity: 1,
        meal: mockMeals[0],
      },
    ],
    totalPrice: 4,
    pickupTime: '7:30 PM',
    deliveryOption: 'pickup',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2025-05-06',
    foodWastePrevented: 0.5,
  },
  {
    id: 'order-2',
    customerId: 'user-1',
    items: [
      {
        mealId: 'meal-3',
        quantity: 2,
        meal: mockMeals[2],
      },
      {
        mealId: 'meal-6',
        quantity: 1,
        meal: mockMeals[5],
      },
    ],
    totalPrice: 10,
    pickupTime: '8:00 PM',
    deliveryOption: 'pickup',
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: '2025-05-05',
    foodWastePrevented: 1.2,
  },
  {
    id: 'order-3',
    customerId: 'user-1',
    items: [
      {
        mealId: 'meal-5',
        quantity: 1,
        meal: mockMeals[4],
      },
    ],
    totalPrice: 5,
    pickupTime: '7:00 PM',
    deliveryOption: 'pickup',
    paymentMethod: 'card',
    status: 'pending',
    createdAt: '2025-05-07',
    foodWastePrevented: 0.8,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    role: 'customer',
    phone: '+1234567890',
    address: '123 Main St, City',
    favorites: ['meal-1', 'meal-5'],
  },
  {
    id: 'user-2',
    name: 'Fatima Al-Rashid',
    email: 'fatima@example.com',
    role: 'restaurant',
    phone: '+0987654321',
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

// Statistics
export const mockStatistics = {
  totalMealsSaved: 12450,
  thisMonth: 1240,
  totalUsers: 5320,
  totalRestaurants: 45,
  totalOrders: 8920,
  totalRevenue: 45230,
  totalFoodWastePrevented: 18750,
};

// Restaurant Statistics
export const mockRestaurantStats = {
  totalMealsSold: 186,
  totalRevenueRecovered: 3348,
  foodWastePrevented: 279,
  averageRating: 4.8,
};

// Weekly data for charts
export const mockWeeklyMealsData = [
  { day: 'Mon', meals: 24 },
  { day: 'Tue', meals: 32 },
  { day: 'Wed', meals: 28 },
  { day: 'Thu', meals: 35 },
  { day: 'Fri', meals: 42 },
  { day: 'Sat', meals: 38 },
  { day: 'Sun', meals: 27 },
];

export const mockWeeklyRevenueData = [
  { day: 'Mon', revenue: 240 },
  { day: 'Tue', revenue: 320 },
  { day: 'Wed', revenue: 280 },
  { day: 'Thu', revenue: 350 },
  { day: 'Fri', revenue: 420 },
  { day: 'Sat', revenue: 380 },
  { day: 'Sun', revenue: 270 },
];
