const Chat = require('../models/chatModel');

exports.getAllChats = async (req, res) => {
  let query;

  if (req.query.email) {
    query = Promise.all([
      Chat.find({ senderEmail: req.query.email }),
      Chat.find({ receiverEmail: req.query.email }),
    ]);
  } else {
    query = Chat.find();
  }

  const chats = await query;

  const filteredChats = [...chats[0], ...chats[1]];

  res.status(200).json({
    status: 'success',
    results: filteredChats.length,
    chats: filteredChats,
  });
};

exports.createChat = async (req, res) => {
  const chat = await Chat.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      chat,
    },
  });
};

exports.getChat = async (req, res) => {
  const chat = await Chat.findOne(req.params);

  res.status(200).json({
    status: 'success',
    chat,
  });
};
