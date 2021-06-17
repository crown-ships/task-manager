const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,

  },
  projectDetails: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyID: {
    type: String
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
    enum: ["approved", "rejected", "wait"]
  },
  rejectReason: {
    type: String
  },
  enabled:{
    type: String,
    default: "true",
    enum: ["true","false"]
  },
  percentComplete:{
    type: Number,
    default:0
  },
  status: {
    type: String
  },
  ownerName: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  attachments:
  {
    data: Buffer,
    contentType: String
  },
  rejectReason: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model("Projects", projectModel);
