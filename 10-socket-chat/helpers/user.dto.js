const { body, param, query } = require('express-validator');
const { validate } = require('../middlewares/validate-errors');
const { isValidRole, emailExists, userByIdExists } = require('./db-validators');


const CreateUserDto = () => {
  return [
    body('email', 'Email is Invalid').isEmail(),
    body('name', 'Name is required').not().isEmpty(),
    body('password', 'Password is required').not().isEmpty(),
    body('password', 'Password must be between 10 and 20').isLength({
      max: 20,
      min: 6,
    }),
    // body('role').custom((role) => isValidObjectId(role)),
    body('role').custom(isValidRole),
    body('email').custom(emailExists),
    validate
  ];
};

const ListUserDto = () => {
  return [
    query('limit', 'limit must be a number').isNumeric(),
    query('offset', 'limit must be a number').isNumeric(),
    validate
  ];
};

const UpdateUserDto = () => {
  return [
    param('id', 'Id is Invalid').isMongoId(),
    body('role').optional().custom(isValidRole),
    param('id').custom(userByIdExists),
    validate
  ];
};

const DeleteUserDto = () => {
  return [
    param('id', 'Id is Invalid').isMongoId(),
    param('id').custom(userByIdExists),
    validate
  ];
};

module.exports = {
  CreateUserDto,
  UpdateUserDto,
  ListUserDto,
  DeleteUserDto
};
