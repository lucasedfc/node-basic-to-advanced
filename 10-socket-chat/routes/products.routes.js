const { Router } = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { productByIdExists } = require('../helpers/db-validators');
const { CreateProductDto, UpdateProductDto, GetProductByIdDto, DeleteProductDto } = require('../helpers/product.dto');
const { validateJWT, isAdminRole } = require('../middlewares');
const router = Router();


/**
 * {{url}}/api/products
 */

// List all products - public
router.get('/', getProducts)

// List category by id - public
router.get('/:id',[GetProductByIdDto()], getProductById)

// Create category -  private with token
router.post('/', [validateJWT, CreateProductDto()], createProduct)

// update - private with token
router.put('/:id', [validateJWT, UpdateProductDto()], updateProduct)

// delete - private Admin
router.delete('/:id',[validateJWT, isAdminRole, DeleteProductDto()], deleteProduct)

module.exports = router;
