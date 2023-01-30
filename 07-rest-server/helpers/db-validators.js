const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (! roleExist ) {
      throw new Error(`${role} is not valid`);
    }
  }
  
  const emailExists = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      throw new Error(`${email} already exists`);
    }
  } 

  const userByIdExists = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
      throw new Error(`User with id: ${id} is missing`);
    }
  } 
  module.exports = {
    isValidRole,
    emailExists,
    userByIdExists
  }