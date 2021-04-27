const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  receiverEmail: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
