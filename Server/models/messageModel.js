

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  time: String
});

module.exports = mongoose.model('Message', messageSchema);
