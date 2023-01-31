const { Router } = require('express');
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require('../controllers/user.controller');
const {
  CreateUserDto,
  UpdateUserDto,
  ListUserDto,
  DeleteUserDto,
} = require('../helpers/user.dto');

const { hasRole, isAdminRole, validateJWT } = require('../middlewares');
const router = Router();

router.get('/', ListUserDto(), userGet);
router.post('/', CreateUserDto(), userPost);
router.put('/:id', UpdateUserDto(), userPut);
router.delete(
  '/:id',
  validateJWT,
  isAdminRole,
  hasRole('ADMIN_ROLE'),
  DeleteUserDto(),
  userDelete
);

module.exports = router;
