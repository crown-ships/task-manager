const mongoose = require('mongoose');

const companyModel = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  websiteURL: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  enabled:{
    type: String,
    default: "true",
    enum: ["true","false"]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Companies", companyModel);
