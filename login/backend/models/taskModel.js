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
  creatorName: {
    type: String,
    required: true
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
  }
});


module.exports = mongoose.model("Tasks", taskModel);
