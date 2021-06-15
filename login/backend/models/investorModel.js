const mongoose = require('mongoose');

const investorModel = new mongoose.Schema({
  investorName: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
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
  dateCreated: {
    type: Date,
    default: Date.now
  },
  rejectReason: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Investors", investorModel);
