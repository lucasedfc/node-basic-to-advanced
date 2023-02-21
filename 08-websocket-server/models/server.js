const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socket.controller');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {};

    //! Middlewares
    this.middlewares();
    //! Routes of the app
    this.routes();

    // Socket config
    this.sockets();
  }

  middlewares() {
    // Enable CORS
    this.app.use(cors());
    // Public folder
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.paths.auth, authRoutes);
  }

  sockets() {
    this.io.on('connection', socketController );
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
