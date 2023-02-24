const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userGet = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const filter = {
    status: true,
  };

  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).limit(limit).skip(offset),
  ]);

  res.json({ total, users });
};

const userPost = async (req = request, res) => {
  const { name, password, email, role } = req.body;
  const user = new User({ name, password, email, role });
  // hash password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  // save
  await user.save();

  res.status(201).json({
    user,
  });
};

const userPut = async (req = request, res) => {
  const { id } = req.params;

  const { _id, google, email, password, ...rest } = req.body;

  //TODO: validate with DB
  if (password) {
    // hash password
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  // delete physical
  // const user = await User.findByIdAndDelete(id);

  
  const user = await User.findByIdAndUpdate(id, {status: false}, { new: true })
  res.json({
    message: 'DELETE API Controller',
    user,
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,  
  userDelete,
};
