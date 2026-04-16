const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    title: 'Organic Cloud-Weave Tee',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    description: 'A premium t-shirt made from organic cotton, feeling as soft as a cloud.'
  },
  {
    title: 'Velocity Sprint Kicks',
    price: 120.00,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Engineered for speed and comfort, these kicks are perfect for your daily sprint.'
  },
  {
    title: 'Genesis Smart Watch',
    price: 199.99,
    category: 'electronics',
    image: 'https://tse1.mm.bing.net/th/id/OIP.GNTmAnspyHRf8Ux1NQnl_QHaNK?rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Track your health and stay connected with the state-of-the-art Genesis Smart Watch.'
  },
  {
    title: 'Aura Silence Over-Ears',
    price: 149.00,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    description: 'Immerse yourself in music with pure silence. Noise-canceling technology at its best.'
  },
  {
    title: 'Minimalist Watch',
    price: 89.00,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'A sleek, minimalist design that complements any outfit.'
  },
  {
    title: 'Classic Leather Bag',
    price: 95.50,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=500&q=80',
    description: 'Handcrafted leather bag designed for durability and style.'
  },
  {
    title: 'Heritage Indigo Trucker',
    price: 85.00,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    description: 'A classic indigo trucker jacket that gets better with time.'
  },
  {
    title: 'Ergonomic Wireless Mouse',
    price: 35.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    description: 'Designed for comfort and precision, this wireless mouse is a productivity boost.'
  },
  {
    title: 'Regal Leather Oxfords',
    price: 110.00,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
    description: 'Polished leather oxfords for a sharp and professional look.'
  },
  {
    title: 'Floral Summer Dress',
    price: 55.00,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    description: 'A light and breezy floral dress perfect for hot summer days.'
  },
  {
    title: 'Comfort Hoodie',
    price: 45.00,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    description: 'The ultimate hoodie for relaxation and casual outings.'
  },
  {
    title: 'Everyday Sneakers',
    price: 65.00,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
    description: 'Versatile sneakers that you can wear all day, every day.'
  },
  {
    title: 'Mechanical Keyboard',
    price: 129.00,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    description: 'A high-performance mechanical keyboard for gamers and writers.'
  },
  {
    title: 'Silver Watch',
    price: 180.00,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80',
    description: 'A sophisticated silver watch that adds a touch of elegance.'
  },
  {
    title: 'Travel Backpack',
    price: 75.00,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    description: 'Spacious and durable backpack designed for your next adventure.'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MiniShop MongoDB for seeding');
    
    try {
      await mongoose.connection.collection('products').drop();
      console.log('Cleared existing products');
    } catch (dropErr) {
      if (dropErr.code !== 26) {
        console.log('Error dropping collection:', dropErr.message);
      }
    }
    
    await Product.insertMany(products);
    console.log('Database seeded with 15 premium products');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
