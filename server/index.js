
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

// add message to the database
app.post("/message", (req, res) =>{
  console.log("Server POST /message");
  const message = req.body.message;
  data.sendMessage(message)
    .then(data => {
      res.json(data);
    })
    .catch(err =>{
      console.log("Server POST /message error", err);
      res.json("");
    })
});

// delete message from database
app.post("/deleteMessage", (req, res)=>{
  console.log("Server POST /deleteMessage");

  const id = req.body.messageId;
  const user = req.body.user;
  const chat = req.body.chat;

  data.deleteMessage(user, chat, id)
    .then(data => res.json([]))
    .catch(err => res.json(["123"]))
});


// delete chat from database
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
  // type - the number of participants in the chat
  // TODO: find a better way to handle this
  socket.on('message', ({message, type}) => {
    const user = data.current(socket.id);
    console.log("Broadcast", user.username, message.room)
    if (type === 2){
      socket.broadcast.to(user.username).emit("message", message);
    }
    else{
      socket.broadcast.to(message.room).emit("message", message);
    }
  });

  // attachment
  socket.on('attachment', ({message, type}) => {
    const user = data.current(socket.id);
    if (type === 2){
      socket.broadcast.to(user.username).emit("attachment", message);
    }
    else{
      socket.broadcast.to(message.room).emit("attachment", message);
    }
  });

  // broadcast the fact that a user
  // has left the group chat
  socket.on('user left', ({username, room}) => {

    console.log("Broadcast", username, room)
    // socket.broadcast.to(room).emit("message", {room, sender, text, date});
    socket.broadcast.to(room).emit("user left", {username});
    
  });

  // add a new chat
  // if the chat name is not given, then it is treated as a private chat
  socket.on("new chat", (chat) =>{
    const name = chat.chat;
    const receivers = chat.receivers;
    const sender = chat.sender;
    const date = chat.date;
    const isEncrypted = chat.isEncrypted;
    
    if (name){
      data.createGroup(sender, name, receivers, date, isEncrypted)
        .then(_ => io.emit("new chat", {chatName: name}));
      
    }
    else{
      data.createChat(sender, receivers, date, isEncrypted)
        .then(_ => io.emit("new chat", {chatName: sender}));
      
    }
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
