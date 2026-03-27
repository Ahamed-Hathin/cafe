const { validationResult } = require('express-validator');
const Menu = require('../models/Menu');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, available } = req.query;
    const filter = {};

    if (category) filter.category = { $regex: category, $options: 'i' };
    if (available !== undefined) filter.availability = available === 'true';

    const items = await Menu.find(filter).sort({ category: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new menu item
// @route   POST /api/menu
// @access  Private (Admin)
const addMenuItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { name, price, category, image, availability } = req.body;

    const item = await Menu.create({ name, price, category, image, availability });

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully.',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private (Admin)
const updateMenuItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully.',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private (Admin)
const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem };
