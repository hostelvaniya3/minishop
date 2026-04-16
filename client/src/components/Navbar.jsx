import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('ms_user'));
  const token = localStorage.getItem('ms_token');

  const handleLogout = () => {
    localStorage.removeItem('ms_token');
    localStorage.removeItem('ms_user');
    setIsOpen(false);
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Mini<span>Shop</span>
        </Link>
        
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links-list">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''} onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={() => setIsOpen(false)}>Blog</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsOpen(false)}>About</Link></li>
            {token ? (
              <li><button onClick={handleLogout} className="btn-logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 500, fontSize: '1rem' }}>Logout</button></li>
            ) : (
              <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={() => setIsOpen(false)}>Login</Link></li>
            )}
            <li>
              <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''} onClick={() => setIsOpen(false)}>
                Cart <span className="cart-badge">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
