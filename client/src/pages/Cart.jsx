import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem('ms_token');
    if (!token) {
      navigate('/login');
    } else {
      alert('Success! Your order has been placed. Thank you for shopping with MiniShop.');
      clearCart();
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1 className="section-title">Your Cart</h1>
        <div className="empty-cart">
          <p style={{ fontSize: '1.2rem' }}>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title">Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-actions">
                <input
                  type="number"
                  className="qty-input"
                  value={item.qty}
                  min="1"
                  onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                />
                <span style={{ fontWeight: 700, minWidth: '70px', textAlign: 'right' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
                <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={handleCheckout}>
            Checkout
          </button>
          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
