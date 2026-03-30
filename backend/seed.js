require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Menu = require('./models/Menu');

const seedData = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) throw new Error('MONGO_URI is missing from .env');

        console.log('🌱 Connecting to MongoDB Atlas...');
        await mongoose.connect(mongoUri);
        console.log('✅ Connected.');

        // 1. Clear existing data (Be careful!)
        await Admin.deleteMany({});
        await Menu.deleteMany({});
        console.log('🧹 Cleared existing database collections.');

        // 2. Create Admin User
        const adminEmail = 'admin@freddobistro.com';
        const rawPassword = 'password123';
        
        // Note: adminSchema handles hashing in pre-save middleware
        await Admin.create({
            username: adminEmail,
            password: rawPassword
        });
        console.log(`👤 Admin Created: ${adminEmail} / ${rawPassword}`);

        // 3. Create Sample Menu Items
        const menuItems = [
            { name: 'Traditional Filter Coffee', price: 45, category: 'Beverages', image: '/filter_coffee.png', availability: true },
            { name: 'Masala Chai', price: 35, category: 'Beverages', image: '/coffee_pour.png', availability: true },
            { name: 'Ghee Podi Roast', price: 110, category: 'Snacks', image: '/masala_dosa.png', availability: true },
            { name: 'Medu Vada (2 pcs)', price: 70, category: 'Snacks', image: '/menu_flatlay.png', availability: true },
            { name: 'Mini Idly Sambar', price: 90, category: 'Breakfast', image: '/idly_sambar.png', availability: true },
            { name: 'Cold Brew Kaapi', price: 150, category: 'Beverages', image: '/coffee_pour.png', availability: true },
        ];

        await Menu.insertMany(menuItems);
        console.log(`🍽️  Inserted ${menuItems.length} menu items.`);

        console.log('✅ All done! You can now log in.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
};

seedData();
