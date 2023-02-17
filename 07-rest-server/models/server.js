const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const categoryRoutes = require('../routes/categories.routes');
const productRoutes = require('../routes/products.routes');
const searchRoutes = require('../routes/search.routes');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      user: '/api/users',
      category: '/api/categories',
      products: '/api/products',
      search: '/api/search'
    }

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
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.user, userRoutes);
    this.app.use(this.paths.category, categoryRoutes);
    this.app.use(this.paths.products, productRoutes);
    this.app.use(this.paths.search, searchRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
