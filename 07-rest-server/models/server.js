const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/users';

    //! DB Connection
    this.connectDB();

    //! Middlewares
    this.middlewares();
    //! Routes of the app
    this.routes();
  }

  middlewares() {
    // Enable CORS
    this.app.use(cors());
    // Parse body
    this.app.use(express.json());
    // Public folder
    this.app.use(express.static('public'));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
