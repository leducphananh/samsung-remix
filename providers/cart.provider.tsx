'use client';

import { CartItem } from '@/types/cart.type';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  totalQty: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeFromCart: handleRemove,
        totalQty,
      }}>
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
