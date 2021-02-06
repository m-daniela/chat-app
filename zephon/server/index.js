
const data = require("./data");

const app = require("express")();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const http = require('http').createServer(app);

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
const port = process.env.port || 5000;
const host = "localhost";
const user = "root";
const password = "pass";
const database = "zephon";

// dummy data, will probably changed to database data
let dummy = {
  test1: {
    user1: "example@mail.com",
    user2: "example2@mail.com",
    messages: [
      {sender: "example", text: "heheh", date: "13:00 31/11/2020"}
    ]
  },
  test2: {
    user1: "example3@mail.com",
    user2: "example2@mail.com",
    messages: [
      {sender: "example", text: "hehe help", date: "13:01 31/11/2020"}
    ]
  }
};


// get the names of the chats
app.post("/", (req, res) => {
  console.log("Server POST");
  // console.log(req);
  // const dummyChats = Object.keys(dummy).map(chat => ({[chat]: {
  //     user1: dummy[chat].user1,
  //     user2: dummy[chat].user2,
  //   }})
  // );

  const dummyChats = Object.keys(dummy)
  console.log(dummyChats);
  res.json(dummyChats);
});

// get the messages from a conversation
app.post("/chats", (req, res) => {
  console.log("Server POST /chats");
  const {user, room} = req.body;
  try{
    res.json(dummy[room].messages);
  }
  catch (err){
    console.log("Empty title")
    res.json([]);
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

    // socket.broadcast.to(room).emit("message", message);
  });

  // send a message to a room
  // add it to the local repo (will be changed to db)
  // broadcast the message to everyone but the sender
  socket.on('message', (message) => {
    const user = data.current(socket.id);

    console.log(message);
    console.log("To", user.room);
    dummy[user.room].messages.push({sender: message.from, text: message.message, date: message.date});
    // console.log(dummy);


    // io.emit("message", message);
    socket.broadcast.to(user.room).emit("message", {sender: message.from, text: message.message, date: message.date});

    // worked before
    // socket.broadcast.emit("message", message);


    // io.to(user.room).emit("message", message);

  });

  // add a new chat
  // broadcast to everyone the fact that a chat 
  // has been created
  socket.on("new chat", (chat) =>{
    const chatName = chat.chat;
    // const user = data.current(socket.id);
    dummy[[chatName]] =  {messages: []};
    console.log(dummy);

    // const newChat = {[`${chatName}`] : {messages: []}};
    const newChat = {[chatName] : {messages: []}};
    console.log(newChat);
    io.emit("new chat", {chatName});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// http.listen(port, () => {
//   console.log('listening on *:5000');
// });
