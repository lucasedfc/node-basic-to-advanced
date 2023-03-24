import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import database from '../db/connection';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // parse body
    this.app.use(express.json());
    // public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  async connectDB() {
    try {
      await database.authenticate();
      console.log('Database Online');
      
    } catch (error) {
      throw new Error(error as string);
      
    }
  }
}

export default Server;
