import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [alert, setAlert] = useState('');
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setActiveFilter(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = activeFilter !== 'all' ? `?category=${activeFilter}` : '';
        const res = await api.get(`/products${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [activeFilter]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAlert(`${product.title} added to cart!`);
    setTimeout(() => setAlert(''), 2500);
  };

  const categories = ['all', 'clothing', 'footwear', 'electronics', 'accessories'];

  return (
    <main>
      <section className="container">
        <h1 className="section-title">All Products</h1>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-secondary filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {alert && <div className="alert alert-success">{alert}</div>}

        <div className="products-grid">
          {products.map(product => (
            <article className="product-card" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.title} className="product-image" />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product._id}`}>
                  <h3 className="product-title">{product.title}</h3>
                </Link>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {products.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            No products found in this category.
          </p>
        )}
      </section>
    </main>
  );
};

export default Products;
