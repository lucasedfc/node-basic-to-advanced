const { body, header } = require('express-validator');
const { validate } = require('../middlewares/validate-errors');


const LoginDto = () => {
  return [
    body('email', 'Email is Invalid').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validate
  ];
};

const validateTokenDto = () => {
  return [
    header('x-token', 'x-token header is required').not().isEmpty(),
    validate
  ];
}

const GoogleDto = () => {
  return [
    body('id_token', 'id_token is required').not().isEmpty(),
    validate
  ];
};

module.exports = {
  LoginDto,
  GoogleDto,
  validateTokenDto
};
