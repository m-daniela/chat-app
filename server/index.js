
const app = require("express")();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const port = 5000;
const host = "localhost";
const user = "root";
const password = "pass";
const database = "zephon-app";


let http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        io.emit('message', msg);
      });
});



http.listen(port, () => {
  console.log('listening on *:5000');
});
