import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('minishop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('minishop_cart', JSON.stringify(items));
  };

  const addToCart = (product) => {
    const existing = cartItems.find(item => item._id === product._id);
    if (existing) {
      const updated = cartItems.map(item =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter(item => item._id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    saveCart(cartItems.map(item => item._id === id ? { ...item, qty } : item));
  };

  const clearCart = () => saveCart([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
