import { Sequelize } from 'sequelize';

const database = new Sequelize('node_server', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
});


export default database; 