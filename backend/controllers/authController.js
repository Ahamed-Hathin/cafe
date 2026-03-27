const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register a new admin (first-time setup helper)
// @route   POST /api/auth/register
// @access  Public (should be locked down in production)
const registerAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: 'Admin with this username already exists.' });
    }

    const admin = await Admin.create({ username, password });
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully.',
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password.' });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

const updateFcmToken = async (req, res, next) => {
    try {
        const { fcmToken } = req.body;
        if (!fcmToken) return res.status(400).json({ success: false, message: 'fcmToken is required' });

        await Admin.findByIdAndUpdate(req.admin._id, { fcmToken });
        res.status(200).json({ success: true, message: 'FCM Token updated' });
    } catch (error) {
        next(error);
    }
}

module.exports = { registerAdmin, loginAdmin, getMe, updateFcmToken };
