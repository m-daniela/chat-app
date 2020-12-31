
const data = require("./data");

const app = require("express")();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const http = require('http').createServer(app);


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

let dummyChats = Object.keys(dummy);

app.post("/", (req, res) => {
  console.log("Server POST");
  // console.log(req);
  res.json(dummyChats);
});

app.post("/chats", (req, res) => {
  console.log("Server POST");
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

  socket.on("join", ({username, room}) => {
    const user = data.join(socket.id, username, room);
    
    // console.log(user);
    socket.join(room);

    // socket.broadcast.to(room).emit("message", message);
  });

  socket.on('message', (message) => {
    const user = data.current(socket.id);

    // console.log(data.users)

    console.log(message);
    console.log("tell me why, from ", user.room);
    dummy[user.room].messages.push({sender: message.from, text: message.message, date: message.date});
    console.log(dummy);


    // io.emit("message", message);
    socket.broadcast.to(user.room).emit("message", {sender: message.from, text: message.message, date: message.date});

    // worked before
    // socket.broadcast.emit("message", message);


    // io.to(user.room).emit("message", message);

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// http.listen(port, () => {
//   console.log('listening on *:5000');
// });
