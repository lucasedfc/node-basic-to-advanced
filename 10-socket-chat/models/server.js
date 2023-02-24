const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const categoryRoutes = require('../routes/categories.routes');
const productRoutes = require('../routes/products.routes');
const searchRoutes = require('../routes/search.routes');
const uploadRoutes = require('../routes/upload.routes');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

const {  createServer } = require('http');
const { socketController } = require('../sockets/socket.controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require('socket.io')(this.server);
    this.paths = {
      auth: '/api/auth',
      user: '/api/users',
      category: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads'
    }

    //! DB Connection
    this.connectDB();

    //! Middlewares
    this.middlewares();
    //! Routes of the app
    this.routes();

    this.socketEvents();
  }

  middlewares() {
    // Enable CORS
    this.app.use(cors());
    // Parse body
    this.app.use(express.json());
    // Public folder
    this.app.use(express.static('public'));

    // File uploads
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.user, userRoutes);
    this.app.use(this.paths.category, categoryRoutes);
    this.app.use(this.paths.products, productRoutes);
    this.app.use(this.paths.search, searchRoutes);
    this.app.use(this.paths.uploads, uploadRoutes);
  }

  socketEvents() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Socket Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
