const { body, param} = require('express-validator');
const { validate } = require('../middlewares/validate-errors');
const { productByIdExists, categoryByIdExists } = require('./db-validators');

const CreateProductDto = () => {
  return [
    body('name', 'Name is Required').not().isEmpty(),
    body('category', 'Invalid Value').isMongoId(),
    body('category').custom(categoryByIdExists),
    validate
  ];
};

const UpdateProductDto = () => {
  return [
    body('category', 'Invalid Value').isMongoId(),
    body('category').custom(categoryByIdExists),
    param('id').isMongoId(),
    param('id').custom(productByIdExists),
    validate
  ];
};

const DeleteProductDto = () => {
  return [
    param('id').custom(productByIdExists),
    validate
  ];
};

const GetProductByIdDto = () => {
  return [
    param('id').isMongoId(),
    param('id').custom(productByIdExists),
    validate
  ];
};

module.exports = {
    CreateProductDto,
    UpdateProductDto,
    GetProductByIdDto,
    DeleteProductDto
};
