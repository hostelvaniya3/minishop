import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MiniShop</h4>
            <p>Find your next favorite item inside our extensive catalog of everyday goods.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p><Link to="/products">Shop Products</Link></p>
            <p><Link to="/blog">Journal (Blog)</Link></p>
            <p><Link to="/about">About Us</Link></p>
            <p><Link to="/login">Login</Link></p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@minishop.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MiniShop. Developed for CMP7246 assessment.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
