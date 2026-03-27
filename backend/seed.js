require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Menu = require('./models/Menu');
const fs = require('fs');

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the .env file. Please check backend/.env');
    }
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding...');

    await Admin.deleteMany({});
    await Menu.deleteMany({});

    await Admin.create({ username: 'admin@freddobistro.com', password: 'password123' });
    console.log('👤 Admin created: admin@freddobistro.com / password123');

    const items = [
      { name: 'Traditional Filter Coffee', price: 45, category: 'Beverages', image: '/filter_coffee.png', availability: true },
      { name: 'Masala Chai', price: 35, category: 'Beverages', image: '/coffee_pour.png', availability: true },
      { name: 'Ghee Podi Roast', price: 110, category: 'Snacks', image: '/masala_dosa.png', availability: true },
      { name: 'Medu Vada (2 pcs)', price: 70, category: 'Snacks', image: '/menu_flatlay.png', availability: true },
      { name: 'Mini Idly Sambar', price: 90, category: 'Breakfast', image: '/idly_sambar.png', availability: true },
      { name: 'Cold Brew Kaapi', price: 150, category: 'Beverages', image: '/coffee_pour.png', availability: true },
    ];

    await Menu.insertMany(items);
    console.log(`🍽️  Inserted ${items.length} menu items.`);

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    const errText = `${err.stack}\n\n${JSON.stringify(err, null, 2)}`;
    fs.writeFileSync('seed_error.txt', errText);
    console.error('❌ Seeding failed. See seed_error.txt');
    process.exit(1);
  }
};

seed();
