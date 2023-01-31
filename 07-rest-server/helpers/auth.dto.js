const { body } = require('express-validator');
const { validate } = require('../middlewares/validate-errors');


const LoginDto = () => {
  return [
    body('email', 'Email is Invalid').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validate
  ];
};

module.exports = {
  LoginDto
};
