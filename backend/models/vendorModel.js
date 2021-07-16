const mongoose = require('mongoose');

const vendorModel = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  vendorName: {
    type: String,
    required: true
  },
  vendorEmail: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  contractAmt: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  pendingAmt: {
    type: Number,
    required: true
  },
  creatorName: {
    type: String,
    required: true
  },
  creatorID: {
    type: String,
    required: true
  },
  approved: {
  type: String,
  default: "wait",
  enum: ["approved", "wait", "rejected"]
  },
  enabled: {
  type: String,
  default: "true",
  enum: ["true", "false"]
  },
  rejectReason: {
    type: String,
    default: ""
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vendors", vendorModel);
