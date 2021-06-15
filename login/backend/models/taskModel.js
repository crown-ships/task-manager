const mongoose = require('mongoose');

const taskModel = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
  },
  taskDetails: {
    type: String,
    required: true
  },
  featureName: {
    type: String,
    required: true
  },
  featureID: {
    type: String,
    required: true
  },
  projectName: {
    type: String
  },
  projectID: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  companyID: {
    type: String
  },
  creatorID: {
    type: String,
    required: true
  },
  creatorName: {
    type: String,
    required: true
  },
  percentComplete:{
    type: Number,
    default:0
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
  enabled:{
    type: String,
    default: "true",
    enum: ["true","false"]
  }
});


module.exports = mongoose.model("Tasks", taskModel);
