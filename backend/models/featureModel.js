const mongoose = require('mongoose');

const featureModel = new mongoose.Schema({
  featureName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,

  },
  featureDetails: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  projectID: {
    type: String
  },
  companyName: {
    type: String
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
  enabled:{
    type: String,
    default: "true",
    enum: ["true","false"]
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
  }
});


module.exports = mongoose.model("Features", featureModel);
