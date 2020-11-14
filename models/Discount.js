const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    empName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    isSingle: {
      type: Boolean,
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    waves: {
      type: [String],
    },
    husband: {
      type: String,
    },
    hasChildren: {
      type: Boolean,
      required: true,
    },
    children: {
      type: [String],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("department", DepartmentSchema);
