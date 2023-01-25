const { response, request } = require('express');

const userGet = (req = request, res = response) => {
  const { sort, limit, page = 1 } = req.query;
  res.json({
    message: 'Get API Controller',
    query: {
      limit,
      sort,
      page,
    },
  });
};

const userPut = (req = request, res) => {
  const { id } = req.params;
  res.json({
    message: 'PUT API Controller',
    id,
  });
};

const userPost = (req = request, res) => {
  const { name, age } = req.body;
  res.status(201).json({
    message: 'POST API Controller',
    name,
    age,
  });
};

const userDelete = (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'DELETE API Controller',
    id,
  });
};

const userPatch = (req, res) => {
  res.json({
    message: 'PATCH API Controller',
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
};
