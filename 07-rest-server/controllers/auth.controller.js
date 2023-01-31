const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/token');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    //todo  check if email exist
    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).json({
            message: `User with email ${email} not exist`
        })
    }
    if (!user.status) {
        return res.status(400).json({
            message: `User with email ${email} is not active`
        })
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            message: `User/Password not valid`
        })
        
    }
    //TODO: return jwt
    const token = await generateJWT(user._id);
  
    try {
        
        res.json({
          user,
          token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unexpected Error'
        })
    }
};

module.exports = {
  login,
};
