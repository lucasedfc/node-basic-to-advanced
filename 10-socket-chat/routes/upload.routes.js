const { Router } = require('express');
const { param } = require('express-validator');
const { loadFile, updateFile, getImage, updateFileCloudinary } = require('../controllers/uploads.controller');
const { validCollections } = require('../helpers');
const { checkFile } = require('../middlewares');
const { validate } = require('../middlewares/validate-errors');
const router = Router();


router.post('/', checkFile, loadFile);
router.get('/:collection/:id', [
    param('collection').custom( c => validCollections(c, ['users', 'products'])),
    param('id', 'Must be a valid mongo Id').isMongoId(),
    validate
], getImage);
router.put('/:collection/:id', [
    checkFile,
    param('collection').custom( c => validCollections(c, ['users', 'products'])),
    param('id', 'Must be a valid mongo Id').isMongoId(),
    validate
], updateFileCloudinary);

module.exports = router;
