import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/products');
        setFeaturedProducts(res.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Expertly Curated Modern Essentials</h1>
            <p>Elevate your lifestyle with our premium collection of sustainably sourced clothing, cutting-edge electronics, and timeless accessories.</p>
            <Link to="/products" className="btn btn-primary">
              Explore Collection
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Fashion Shopping"
            />
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '5rem 0' }}>
        <h2 className="section-title">New Arrivals</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <Link to={`/product/${product._id}`} key={product._id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="btn btn-secondary">View Details</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/products" className="btn btn-primary">Show All Products</Link>
        </div>
      </section>

      <section style={{ background: '#f1f5f9', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
              </svg>
            </div>
            <h3>Free Worldwide Shipping</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Zero hidden fees, delivered directly to your doorstep anywhere in the world.</p>
          </div>
          <div>
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>100% Secure Payments</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Your financial safety is our priority. All transactions are fully encrypted.</p>
          </div>
          <div>
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Premium 24/7 Support</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Got questions? Our dedicated support team is here to help you around the clock.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '5rem 0' }}>
        <h2 className="section-title">Latest from Our Journal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
           <article style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" alt="Fashion" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem' }}>FASHION</Link>
                <h3 style={{ margin: '0.5rem 0' }}>Top 10 Fashion Trends for 2026</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>I've been looking into how sustainability is completely shifting what we wear...</p>
                <Link to="/blog" className="btn btn-secondary">Read More</Link>
              </div>
           </article>
           <article style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80" alt="Lifestyle" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <Link to="/blog" style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.8rem' }}>LIFESTYLE</Link>
                <h3 style={{ margin: '0.5rem 0' }}>Building a Minimalist Wardrobe</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Ever open your wardrobe and feel overwhelmed? I tried stripping it down...</p>
                <Link to="/blog" className="btn btn-secondary">Read More</Link>
              </div>
           </article>
        </div>
      </section>

      <section style={{ background: 'var(--primary)', color: '#fff', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join the Inner Circle</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Get early access to drops, exclusive discounts, and professional styling tips delivered to your inbox.</p>
          <form className="newsletter-form" style={{ display: 'flex', gap: '0.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <input type="email" placeholder="Email address" className="form-control" style={{ border: 'none' }} required />
            <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>Sign Up</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
