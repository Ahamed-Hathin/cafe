const { validationResult } = require('express-validator');
const Message = require('../models/Message');

// @desc    Save a customer contact message
// @route   POST /api/contact
// @access  Public
const saveMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { name, phone, message } = req.body;

    const newMessage = await Message.create({ name, phone, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
// @access  Private (Admin)
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { saveMessage, getAllMessages };
