const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user","super-admin", "supervisor"]
  },
  idCard:{
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model("Users", userModel);
