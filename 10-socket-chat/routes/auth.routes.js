const { Router } = require('express');
const {
  login, googleSignIn, renewToken
} = require('../controllers/auth.controller');
const { LoginDto, GoogleDto, validateTokenDto } = require('../helpers/auth.dto');
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router();

router.get('/', [validateTokenDto(), validateJWT], renewToken );
router.post('/login', LoginDto(), login);
router.post('/google', GoogleDto(), googleSignIn);

module.exports = router;
