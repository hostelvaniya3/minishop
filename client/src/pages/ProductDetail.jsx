import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) return <div className="container py-5">Loading product...</div>;
  if (!product) return <div className="container py-5">Product not found.</div>;

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Products
      </Link>
      
      {added && (
        <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
          ✨ Excellent choice! <strong>{product.title}</strong> has been added to your cart.
        </div>
      )}

      <div className="product-detail-layout">
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
        </div>
        <div>
          <span style={{ background: 'var(--bg-color)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
            {product.category.toUpperCase()}
          </span>
          <h1 style={{ fontSize: '3rem', margin: '1rem 0', color: 'var(--text-main)' }}>{product.title}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.5rem' }}>${product.price.toFixed(2)}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
            {product.description || 'No description available for this premium item. Experience quality and style combined in this exclusive MiniShop product.'}
          </p>
          <button onClick={handleAddToCart} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
