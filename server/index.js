
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
    const sender = message.from;
    const text = message.message;
    const date = message.date;
    const room = message.room;
    const receivers = message.receivers;

    data.sendMessage(sender, room, receivers, text, date);
    socket.broadcast.to(user.username).emit("message", {sender, text, date});
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
