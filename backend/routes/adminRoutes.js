const express = require('express');
const { getDashboardStats, getSalesReport } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);
router.get('/sales', protect, getSalesReport);

module.exports = router;
