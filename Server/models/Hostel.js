const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  phone: Number,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  },
});

const HostelModel = mongoose.model("users", HostelSchema);
module.exports = HostelModel;
