const Order = require('../models/Order');

// @desc    Get dashboard metrics (today's stats)
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdAt: { $gte: today }
    });

    const totalOrders = orders.length;
    
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
    
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Ready' || o.status === 'Served').length; // Added Served as completed too if exists

    // Find most frequent item
    const itemCounts = {};
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
      }
    });

    let topItem = "None";
    let maxCount = 0;
    for (const [name, count] of Object.entries(itemCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topItem = name;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        topItem
      }
    });
  } catch (error) {
    console.error('API /admin/dashboard Error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving dashboard stats' });
  }
};

// @desc    Get sales report grouped by date
// @route   GET /api/admin/sales?range=7days|30days
// @access  Private/Admin
const getSalesReport = async (req, res) => {
  try {
    const range = req.query.range === '30days' ? 30 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);
    startDate.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 });

    // Build a map of every date in the range (so empty days show as 0)
    const dateMap = {};
    for (let i = 0; i < range; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (range - 1 - i));
      const key = d.toISOString().split('T')[0]; // YYYY-MM-DD
      dateMap[key] = { date: key, totalOrders: 0, totalRevenue: 0 };
    }

    // Populate with real data
    orders.forEach(order => {
      const key = new Date(order.createdAt).toISOString().split('T')[0];
      if (dateMap[key]) {
        dateMap[key].totalOrders += 1;
        dateMap[key].totalRevenue += order.totalPrice || 0;
      }
    });

    const report = Object.values(dateMap);

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('API /admin/sales Error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving sales report' });
  }
};

module.exports = {
  getDashboardStats,
  getSalesReport
};
