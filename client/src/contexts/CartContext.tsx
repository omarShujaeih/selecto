import React, { createContext, useContext, useState } from 'react';
import { CartItem, Meal } from '@/data/mockData';

interface CartContextType {
  items: CartItem[];
  addItem: (meal: Meal, quantity: number) => void;
  removeItem: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (meal: Meal, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.mealId === meal.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.mealId === meal.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { mealId: meal.id, quantity, meal }];
    });
  };

  const removeItem = (mealId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.mealId !== mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(mealId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.mealId === mealId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.meal.discountedPrice * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
