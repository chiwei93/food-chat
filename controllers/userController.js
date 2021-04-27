const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    // if (!req.body.name) {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'Must provide a name'
    //   })
    // }

    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    // console.log(err);

    // console.log(err.name);

    console.log(err.message);

    if (err.name === 'ValidationError') {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'err',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.params);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
