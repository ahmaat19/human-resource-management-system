const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
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
    wives: {
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

module.exports = mongoose.model("discount", DiscountSchema);
