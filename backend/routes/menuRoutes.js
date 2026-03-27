const express = require('express');
const { body } = require('express-validator');
const {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const menuValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required').trim(),
];

// Routes
router.get('/', getAllMenuItems);
router.post('/', protect, menuValidation, addMenuItem);
router.put('/:id', protect, updateMenuItem);
router.delete('/:id', protect, deleteMenuItem);

module.exports = router;
