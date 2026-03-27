const express = require('express');
const { body } = require('express-validator');
const { saveMessage, getAllMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation for contact form
const contactValidation = [
  body('message')
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5 }).withMessage('Message must be at least 5 characters')
    .trim(),
  body('name').optional().trim(),
  body('phone').optional().trim(),
];

// Routes
router.post('/', contactValidation, saveMessage);
router.get('/', protect, getAllMessages);   // Admin: view all messages

module.exports = router;
