const mongoose = require('mongoose');

const returnsModel = new mongoose.Schema({
  investmentName: {
    type: String,
    required: true
  },
  investmentID: {
    type: String,
    required: true
  },
  investorName: {
    type: String,
    required: true
  },
  investorID: {
    type: String,
    required: true
  },
  paymentTerms: {
    type: String
  },
  returnAmt: {
    type: Number,
    required: true
  },
  totalInterestAmt:{
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  localDueDate: {
    type: Date,
    required: true
  },
  isPaid: {
    type: String,
    default: "no",
    enum: ["no", "yes"]
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

module.exports = mongoose.model("Returns", returnsModel);
