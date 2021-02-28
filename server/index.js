
require('dotenv').config();

const data = require("./data");
const {generateVirgilJwt} = require("./jwtToken");
const {requireAuthHeader} = require("./validation");
const auth = require("./auth");

const app = require("express")();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const http = require('http').createServer(app);


// testing - keep for now
// data.addUser("example5@mail.com");
// data.addUser("example3@mail.com");
// data.createChat("example5@mail.com", "example3@mail.com");

// data.sendMessage("example5@mail.com", "example3@mail.com", "help", new Date());
// data.getConversations("example5@mail.com").then(dd => console.log(dd));
// data.getMessages("example5@mail.com", "example3@mail.com").then(dd => console.log(dd));


app.use(cors({
  methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  origin: "http://localhost:3000"
}));
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// need to set cors, otherwise it isn't working
// const io = require('socket.io')(http, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// connection constants and local database
// the port will change on deployment
const port = process.env.PORT || 5000;

// dummy data, will probably be changed to database data
let dummy = {
  test1: {
    messages: [
      {sender: "example", text: "heheh", date: "13:00 31/11/2020"}
    ]
  },
  test2: {
    messages: [
      {sender: "example", text: "hehe help", date: "13:01 31/11/2020"}
    ]
  }
};


// get the names of the chats
app.post("/", (req, res) => {
  console.log("Server POST");
  // console.log(req.body);
  const user = req.body.user;
  console.log("Server POST", user);
  if (user){
    data.getConversations(user).then(data => res.json(data));
  }

  // const dummyChats = Object.keys(dummy)
  // res.json(dummyChats);


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


// get the messages from a conversation
app.post("/chats", (req, res) => {
  console.log("Server POST /chats");
  const {user, room} = req.body;
  console.log(req.body)
  // try{
  //   res.json(dummy[room].messages);
  // }
  // catch (err){
  //   console.log("Empty title")
  //   res.json([]);
  // }
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
    // dummy[user.room].messages.push({sender: message.from, text: message.message, date: message.date});
    // console.log(dummy);

    // io.broadcast.to(user.room).emit("message", {sender: message.from, text: message.message, date: message.date});
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
    // const user = data.current(socket.id);
    // dummy[[chatName]] =  {messages: []};
    // console.log(dummy);

    // // const newChat = {[`${chatName}`] : {messages: []}};
    // const newChat = {[chatName] : {messages: []}};
    // console.log(newChat);

    data.createChat(sender, receiver, date)

    io.emit("new chat", {chatName: receiver});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// http.listen(port, () => {
//   console.log('listening on *:5000');
// });
