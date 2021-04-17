
require('dotenv').config();

const data = require("./data");
const {generateVirgilJwt} = require("./authentication/jwtToken");
const {requireAuthHeader} = require("./authentication/validation");
const auth = require("./authentication/auth");

const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(cors({
  methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  origin: "http://localhost:3000"
}));
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// connection constants and local database
// the port will change on deployment
const port = process.env.PORT || 5000;


// get the conversations for the given user
app.post("/", (req, res) => {
  console.log("Server POST");
  const user = req.body.user;
  if (user){
    data.getConversations(user).then(data => res.json(data));
  }
});

// authenticate 
// add a user to the database if it is not there
// already and ask for the jwt
app.post("/auth", (req, res) =>{
  console.log("Server POST /auth");
  try{
    console.log(req.body);
    const email = req.body.user;
    if (email !== undefined || email !== null){
      data
        .addUser(email, req, res)
        .then(auth.authenticate(req, res));
    }
  }
  catch(err){
    console.log("Server POST /auth:", err);
  }
  
})

// get jwt
app.get('/virgil-jwt', requireAuthHeader, generateVirgilJwt);


// get messages from the given conversation
// and user
app.post("/chats", (req, res) => {
  console.log("Server POST /chats");
  const {user, room} = req.body;
  console.log(req.body)
  if (room === ""){
    console.log("POST /chats: no conversation selected")
    res.json([]);
  }
  else{
    console.log("Kill me", user, room)
    data
      .getMessages(user, room)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("Post /chats: error", err);
        res.json([]);
      });
  }
  
});

app.post("/message", (req, res) =>{
  console.log("Server POST /message");
  const message = req.body.message;
  data.sendMessage(message)
    .then(data => {
      // const newMessage = {
      //   id: data,
      //   room: message.room, 
      //   sender: message.from, 
      //   text: message.message, 
      //   date: message.date,
      // };
      // socket.broadcast.to(message.from).emit("message", newMessage);
      res.json(data);
    })
    .catch(err =>{
      console.log("Server POST /message error", err);
      res.json("");
    })
});

app.post("/deleteMessage", (req, res)=>{
  console.log("Server POST /deleteMessage");

  const id = req.body.messageId;
  const user = req.body.user;
  const chat = req.body.chat;

  data.deleteMessage(user, chat, id)
    .then(data => res.json([]))
    .catch(err => res.json(["123"]))

});

app.post("/chat", (req, res)=>{
  console.log("Server  POST /chat");

  const user = req.body.user;
  const chat = req.body.chat;

  data.deleteConversation(user, chat)
    .then(data => res.json([]))
    .catch(err => res.json(["123"]))

});

const server = app.listen(port, () => {
  console.log('listening on *:5000');
});

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('user connected');

  // join a room
  socket.on("join", ({username, room}) => {
    data.join(socket.id, username, room);
    socket.join(room);
  });

  // send a message to a room
  // broadcast the message to everyone but the sender
  // and add it to the database
  socket.on('message', (message) => {
    const user = data.current(socket.id);
    console.log("Broadcast", user.username)
    socket.broadcast.to(user.username).emit("message", message);

    // const user = data.current(socket.id);
    // const sender = message.from;
    // const text = message.message;
    // const date = message.date;
    // const room = message.room;
    // const receivers = message.receivers;

    // data.sendMessage2(sender, room, receivers, text, date);
    // console.log("Broadcast", user.username, room)
    // // socket.broadcast.to(room).emit("message", {room, sender, text, date});
    // socket.broadcast.to(user.username).emit("message", {room, sender, text, date});
    // io.to(room).emit("message", {room, sender, text, date});

    // const user = data.current(socket.id);
    // const receivers = message.receivers;
    // console.log(message);
    // console.log("from", user);
    // console.log("To", user.room);
    // console.log("Tooo", receivers);

    // socket.broadcast.to(user.username).emit("message", {sender: message.from, text: message.message, date: message.date});

    // data.sendMessage(message.from, user.room, receivers, message.message, message.date);
  });

  // broadcast the fact that a user
  // has left the group chat
  socket.on('user left', ({username, room}) => {

    console.log("Broadcast", username, room)
    // socket.broadcast.to(room).emit("message", {room, sender, text, date});
    socket.broadcast.to(room).emit("user left", {username});
    
  });

  // add a new chat
  // broadcast to the receiver 
  // add it to the databse
  socket.on("new chat", (chat) =>{
    const receiver = chat.chat;
    const sender = chat.sender;
    const date = chat.date;

    data.createChat(sender, receiver, date)
    io.emit("new chat", {chatName: receiver});
  });

  // add a new group chat
  // broadcast to the receivers
  // add it to the database
  socket.on("new group", (chat) =>{
    const name = chat.chat;
    const receivers = chat.receivers;
    const sender = chat.sender;
    const date = chat.date;

    data.createGroup(sender, name, receivers, date)
    io.emit("new group", {chatName: name});
  });
  

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
