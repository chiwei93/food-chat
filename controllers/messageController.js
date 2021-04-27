const Message = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  try {
    let query;

    if (req.query.roomID) {
      query = Message.find({ roomID: req.query.roomID });
    } else {
      query = Message.find();
    }

    const messages = await query;

    res.status(200).json({
      status: 'success',
      results: messages.length,

      messages,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    console.log(req.params.id);
    await Message.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
