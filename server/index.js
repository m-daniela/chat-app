
require('dotenv').config();

const data = require("./data");
const {generateVirgilJwt} = require("./authentication/jwtToken");
const {requireAuthHeader} = require("./authentication/validation");
const auth = require("./authentication/auth");

const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

// const mysql = require("mysql");
// const http = require('http').createServer(app);

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
// add a user to the database if not there already
// ask for jwt 
app.post("/auth", (req, res) =>{
  console.log("Server POST /auth");
  try{
    console.log(req.body);
    const email = req.body.user;
    if (email !== undefined || email !== null){
      data.addUser(email, req, res)
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
    data.getMessages(user, room)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("Post /chats error", err);
      res.json([]);
    });
  }
  
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
    const user = data.join(socket.id, username, room);
    
    // console.log(user);
    socket.join(room);
  });

  // send a message to a room
  // add it to the local repo (will be changed to db)
  // broadcast the message to everyone but the sender
  socket.on('message', (message) => {
    const user = data.current(socket.id);
    console.log(message);
    console.log("from", user);
    console.log("To", user.room);

    socket.broadcast.to(user.username).emit("message", {sender: message.from, text: message.message, date: message.date});

    data.sendMessage(message.from, user.room, message.message, message.date);

  });

  // add a new chat
  // broadcast to everyone the fact that a chat 
  // has been created
  socket.on("new chat", (chat) =>{
    const receiver = chat.chat;
    const sender = chat.sender;
    const date = chat.date;
    console.log("-----", receiver, sender, date)

    data.createChat(sender, receiver, date)

    io.emit("new chat", {chatName: receiver});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
