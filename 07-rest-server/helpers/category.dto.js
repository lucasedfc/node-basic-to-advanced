const { body, param} = require('express-validator');
const { validate } = require('../middlewares/validate-errors');
const { categoryByIdExists } = require('./db-validators');


const CreateCategoryDto = () => {
  return [
    body('name', 'Name is Required').not().isEmpty(),
    validate
  ];
};

const UpdateCategoryDto = () => {
  return [
    body('name', 'Name is Required').not().isEmpty(),
    param('id').custom(categoryByIdExists),
    validate
  ];
};

const DeleteCategoryDto = () => {
  return [
    param('id').custom(categoryByIdExists),
    validate
  ];
};

const GetCategoryByIdDto = () => {
  return [
    param('id').isMongoId(),
    param('id').custom(categoryByIdExists),
    validate
  ];
};

module.exports = {
    CreateCategoryDto,
    UpdateCategoryDto,
    GetCategoryByIdDto,
    DeleteCategoryDto
};
