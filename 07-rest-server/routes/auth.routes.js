const { Router } = require('express');
const {
  login, googleSignIn
} = require('../controllers/auth.controller');
const { LoginDto, GoogleDto } = require('../helpers/auth.dto');
const router = Router();

router.post('/login', LoginDto(), login);
router.post('/google', GoogleDto(), googleSignIn);

module.exports = router;
