const express = require('express');
const messageController = require('./controllers/messageController');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/api/v1/messages', messageController.getAllMessages);

app.post('/api/v1/messages', messageController.createMessage);

app
  .route('/api/v1/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

app.get('/api/v1/users/:email', userController.getUser);

app
  .route('/api/v1/chats')
  .get(chatController.getAllChats)
  .post(chatController.createChat);

app.get('/api/v1/chats/:roomID', chatController.getChat);

module.exports = app;
