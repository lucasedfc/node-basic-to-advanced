const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');
const { User, Category, Product } = require('../models');

const permittedCollections = ['categories', 'products', 'roles', 'users'];

const searchUsers = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const categories = await Category.findById(term);
    return res.json({
      results: categories ? [categories] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({ name: regex, status: true });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const products = await Product.findById(term)
        .populate('category', 'name');
    return res.json({
      results: products ? [products] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({ name: regex, status: true })
                    .populate('category', 'name');

  res.json({
    results: products,
  });
};

const search = async (req = request, res) => {
  const { collection, term } = req.params;

  if (!permittedCollections.includes(collection)) {
    return res.status(400).json({
      message: `Collection availables are ${permittedCollections}`,
    });
  }

  switch (collection) {
    case 'categories':
      searchCategories(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    case 'users':
      searchUsers(term, res);
      break;
    default:
      res.status(500).json({
        message: `Search not available`,
      });
  }
};

module.exports = {
  search,
};
