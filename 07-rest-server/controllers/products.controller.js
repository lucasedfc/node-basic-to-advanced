const { response, request } = require('express');
const { Product } = require('../models');

// paginado - total - populate
const getProducts = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const filter = {
    status: true,
  };

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate('user', 'name')
      .populate('category', 'name')
      .limit(limit)
      .skip(offset),
  ]);

  res.json({ total, products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('user', 'name');

  res.json(product);
};

// name
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const ProductDeleted = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(ProductDeleted);
};

const createProduct = async (req = request, res = response) => {

  const { status, user, ...body } = req.body;
  
  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      message: `The Product ${name} already exist`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
