const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation for creating an order
const createOrderValidation = [
  body('customerName').notEmpty().withMessage('Customer name is required').trim(),
  body('phone').notEmpty().withMessage('Phone number is required').trim(),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.name').notEmpty().withMessage('Item name is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Item quantity must be at least 1'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Item price must be a positive number'),
];

// Routes
router.post('/', createOrderValidation, createOrder);
router.get('/', protect, getAllOrders);
router.put('/:id', protect, updateOrderStatus);

module.exports = router;
