const { Router } = require('express');
const {
  login
} = require('../controllers/auth.controller');
const { LoginDto } = require('../helpers/auth.dto');
const router = Router();

router.post('/login', LoginDto(), login);

module.exports = router;
