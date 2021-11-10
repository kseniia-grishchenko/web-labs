const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, ()=> {
  console.log(`Server is up on port ${port}.`)
});

const clients = {}

// io.set('transports', ['polling']);
io.on('connection', (socket) => {
  console.log('A user just connected.');

  const transport = socket.conn.transport.name; // for example, "polling"
  console.log("current transport", transport);

  socket.conn.on("upgrade", () => {
    const newTransport = socket.conn.transport.name; // for example, "websocket"
    console.log("new transport", newTransport);
  });

  socket.on('disconnect', () => {
      console.log('A user has disconnected.');
  })

  socket.on('startGame', () => {
    io.emit('startGame');
  })

  socket.on('home', () => {
    console.log('home button pressed');
    io.emit('home');
  })

  socket.on('crazyIsClicked', (data) => {
    io.emit('crazyIsClicked', data);
  });
});

