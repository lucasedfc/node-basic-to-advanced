import { DataTypes } from 'sequelize';
import database from '../db/connection';

const User = database.define('user', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});


export default User;