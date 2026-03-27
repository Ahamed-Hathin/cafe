const express = require('express');
const { body } = require('express-validator');
const {
  registerAdmin,
  loginAdmin,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .trim(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('username').notEmpty().withMessage('Username is required').trim(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', registerValidation, registerAdmin);
router.post('/login', loginValidation, loginAdmin);
router.post('/fcm-token', protect, require('../controllers/authController').updateFcmToken);
router.get('/me', protect, getMe);

module.exports = router;
