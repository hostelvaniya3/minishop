const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow all for easy initial deployment verification

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MiniShop MongoDB connected'))
  .catch(err => console.error(err));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => res.send('MiniShop API Running...'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`MiniShop Server on ${PORT}`));
