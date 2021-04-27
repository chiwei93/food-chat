const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
