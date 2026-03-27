const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Anonymous',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      required: [true, 'Message content is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
