const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
  },
  leave: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('leave', LeaveSchema);
