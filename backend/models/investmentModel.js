const mongoose = require('mongoose');

const investmentModel = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  investorName: {
    type: String,
  },
  investorID: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,

  },
  profitPercent: {
    type: Number,
    default: 12
  },
  capitalAmt: { //currency?
    type: Number,
    required: true
  },
  capitalPaid: {
    type: Number,
    default:0
  },
  investmentName: {
    type: String,
    required: true
  },
  investmentType:{
    type: String,
    required: true,
    enum: ["one-time", "recurring"]
  },
  approved: {
    type: String,
    default:"wait",
    enum: ["approved", "wait", "rejected"]
  },
  creatorName:{
    type: String
  },
  creatorID: {
    type: String
  },
  paymentTerms: {
    type: String,
    required: true,
    default: "none",
    enum: ["monthly", "quarterly", "half-yearly", "yearly", "none"]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  percentComplete:{
    type: Number,
    default:0
  },
  rejectReason: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Investments", investmentModel);
