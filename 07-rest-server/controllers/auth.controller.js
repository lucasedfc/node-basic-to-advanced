const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/token');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  //todo  check if email exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: `User with email ${email} not exist`,
    });
  }
  if (!user.status) {
    return res.status(400).json({
      message: `User with email ${email} is not active`,
    });
  }
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: `User/Password not valid`,
    });
  }
  const token = await generateJWT(user._id);

  try {
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unexpected Error',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  console.log(id_token);
  try {
    const { name, picture, email } = await googleVerify(id_token);

console.log(email);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':p',
        picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        message: 'User disabled',
      });
    }

    const token = await generateJWT(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Cannot verify token',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
