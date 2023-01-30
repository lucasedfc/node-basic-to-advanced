const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.info('Database Connected');
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting MongoDB');
  }
};

module.exports = {
  dbConnection,
};
