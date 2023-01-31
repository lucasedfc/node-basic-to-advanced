const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const User = require('../models/user');
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid Token - User not exist',
      });
    }
    if (!user.status) {
      return res.status(401).json({
        message: 'Invalid Token - User disabled',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    });
  }
};

module.exports = {
  validateJWT,
};
