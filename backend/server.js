require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const { initFirebase } = require('./utils/fcm');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const Admin = require('./models/Admin');
const Menu = require('./models/Menu');

// Route imports
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Firebase (real or mock)
initFirebase();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', messageRoutes);
app.use('/api/admin', adminRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '☕ Freddo Bistro Coffee API is running!',
    version: '1.0.0',
    endpoints: {
      menu:    '/api/menu',
      orders:  '/api/orders',
      auth:    '/api/auth',
      contact: '/api/contact',
      admin:   '/api/admin',
    },
  });
});

// ─── Temporary Seed Route (RESTRICTED) ───────────────────────────────────────
app.get('/api/seed', async (req, res) => {
  try {
    const { key } = req.query;
    if (key !== '12345') {
      return res.status(403).json({ success: false, message: 'Forbidden. Incorrect Key.' });
    }

    console.log('🌱 Seeding process started via API...');

    // Clear existing data
    await Admin.deleteMany({});
    await Menu.deleteMany({});
    console.log('🧹 Database cleared.');

    // Create Admin User (pre-save middleware handles bcrypt hashing)
    await Admin.create({ 
      username: 'admin@freddobistro.com', 
      password: 'password123' 
    });
    console.log('👤 Admin user created.');

    // Insert Menu Items
    const menuItems = [
      { name: 'Traditional Filter Coffee', price: 45, category: 'Beverages', image: '/filter_coffee.png', availability: true },
      { name: 'Masala Chai', price: 35, category: 'Beverages', image: '/coffee_pour.png', availability: true },
      { name: 'Ghee Podi Roast', price: 110, category: 'Snacks', image: '/masala_dosa.png', availability: true },
      { name: 'Medu Vada (2 pcs)', price: 70, category: 'Snacks', image: '/menu_flatlay.png', availability: true },
      { name: 'Mini Idly Sambar', price: 90, category: 'Breakfast', image: '/idly_sambar.png', availability: true },
    ];
    await Menu.insertMany(menuItems);
    console.log(`🍽️  ${menuItems.length} menu items inserted.`);

    res.status(200).json({ 
      success: true, 
      message: 'Database seeded successfully. Admin created: admin@freddobistro.com / password123' 
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    res.status(500).json({ success: false, message: 'Seeding failed: ' + error.message });
  }
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n☕ ================================`);
  console.log(`   Freddo Bistro Coffee API`);
  console.log(`   Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`☕ ================================\n`);
});

module.exports = app;
