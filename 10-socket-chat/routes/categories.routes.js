const { Router } = require('express');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { CreateCategoryDto, UpdateCategoryDto, GetCategoryByIdDto, DeleteCategoryDto } = require('../helpers/category.dto');
const { validateJWT, isAdminRole } = require('../middlewares');
const router = Router();


/**
 * {{url}}/api/categories
 */

// List all categories - public
router.get('/', getCategories)

// List category by id - public
router.get('/:id', GetCategoryByIdDto(), getCategoryById)

// Create category -  private with token
router.post('/', [validateJWT, CreateCategoryDto()], createCategory)

// update - private with token
router.put('/:id', [validateJWT, UpdateCategoryDto()], updateCategory)

// delete - private Admin
router.delete('/:id',[validateJWT, isAdminRole, DeleteCategoryDto()], deleteCategory)

module.exports = router;
