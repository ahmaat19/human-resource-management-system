const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  emp_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('employee', EmployeeSchema);
