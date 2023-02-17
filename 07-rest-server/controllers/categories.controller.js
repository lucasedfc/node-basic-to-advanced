const { response, request } = require('express');
const { Category } = require('../models');

// paginado - total - populate
const getCategories = async (req, res) => {
  const { limit = 5, offset = 0 } = req.query;
  const filter = {
    status: true,
  };

  const [total, categories] = await Promise.all([
    Category.countDocuments(filter),
    Category.find(filter)
        .populate('user', 'name')
        .limit(limit)
        .skip(offset)
  ]);

  res.json({ total, categories });
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);
};

// name
const updateCategory = async (req, res) => {
    const { id } = req.params;

    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;
  
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
  
    res.json(category);
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    const categoryDeleted = await Category.findByIdAndUpdate(id, {status: false}, {new: true})

    res.json(categoryDeleted)
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `The category ${name} already exist`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
