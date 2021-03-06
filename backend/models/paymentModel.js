const mongoose = require('mongoose');

const paymentModel = new mongoose.Schema({
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
  vendorID: {
    type: String
  },
  vendorStartDate: {
    type: Date,
    default: Date.now
  },
  vendorEndDate: {
    type: Date,
    default: Date.now
  },
  vendorCrtAmt: {
    type: Number
  },
  amtToBePaid: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  creatorName: {
    type:String,
    required: true
  },
  creatorID: {
    type:String,
    required: true
  },
  approved:{
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
  },
  isPaid: {
    type: String,
    default: "no",
    enum: ["no", "yes"]
  }
});

module.exports = mongoose.model("PaymentReqs", paymentModel);
