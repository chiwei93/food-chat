const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const Chat = require('./models/chatModel');
const Message = require('./models/messageModel');

dotenv.config({ path: './config.env' });

const app = require('./app');

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', socket => {
  io.emit('fromapi', 'hello from the server');

  socket.on('startChat', async (senderEmail, receiverEmail) => {
    //check if room existed for the two users
    let chat = await Chat.findOne({ senderEmail, receiverEmail });

    if (!chat) {
      chat = await Chat.findOne({
        senderEmail: receiverEmail,
        receiverEmail: senderEmail,
      });
    }

    if (!chat) {
      //create new chat

      //error handling where user cannot initiate chat with self
      if (senderEmail === receiverEmail) {
        return;
      }

      chat = await Chat.create({
        roomID: uuidv4(),
        senderEmail,
        receiverEmail,
      });
    }

    const messages = await Message.find({ roomID: chat.roomID });

    socket.join(chat.roomID);
    io.to(chat.roomID).emit('sendRoomID', chat.roomID);
    io.to(chat.roomID).emit('loadMessages', messages);
  });

  socket.on('broadcastMessage', async (roomID, senderEmail, message) => {
    //save the message to the database
    const newMessage = await Message.create({ roomID, senderEmail, message });

    //emit event back to the room
    io.to(roomID).emit('receiveBroadcast', newMessage);
  });
});

const connection_url = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(connection_url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connection successful');
  })
  .catch(err => console.log(err));

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
