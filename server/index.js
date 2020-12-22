
const data = require("./data");

const app = require("express")();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const http = require('http').createServer(app);

// need to set cors, otherwise it isn't working
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// connection constants and local database
// the port will change on deployment
const port = process.env.port || 5000;
const host = "localhost";
const user = "root";
const password = "pass";
const database = "zephon";


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


    // io.emit("message", message);
    socket.broadcast.to(user.room).emit("message", message);

    // worked before
    // socket.broadcast.emit("message", message);


    // io.to(user.room).emit("message", message);

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(port, () => {
  console.log('listening on *:5000');
});
