const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Redis connection
const redis = new Redis(process.env.REDIS_URL);

redis.subscribe('notifications', (err, count) => {
  if (err) {
    console.error('Failed to subscribe: ', err.message);
  } else {
    console.log(`Subscribed to ${count} channel(s).`);
  }
});

// When a message is published on the Redis channel, broadcast it to connected clients
redis.on('message', (channel, message) => {
  console.log(`Received data on channel ${channel}: ${message}`);
  io.emit('new_log', message);
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Socket.IO server running on port ${process.env.PORT}`);
});
