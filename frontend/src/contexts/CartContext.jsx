import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../api/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await cartAPI.getCart();
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addToCart(productId, quantity);
      setItems(prev => {
        const existing = prev.find(item => item.productId._id === productId);
        if (existing) {
          return prev.map(item =>
            item.productId._id === productId ? response.data : item
          );
        }
        return [...prev, response.data];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await cartAPI.updateCartItem(itemId, quantity);
      setItems(prev =>
        prev.map(item => item._id === itemId ? response.data : item)
      );
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartAPI.removeFromCart(itemId);
      setItems(prev => prev.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      // Since we're clearing all items, we can just set items to empty array
      // In a real app, you might want to call an API to clear cart on server
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalPrice = items.reduce((sum, item) => {
    const price = item.productId?.price || item.product?.price || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
    refetch: fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
