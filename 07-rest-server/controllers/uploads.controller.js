const { response, request } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

const loadFile = async (req = request, res = response) => {

  try {
    //   filename = await uploadFile(req.files, ['text/plain', 'text/markdown'], 'texts');
    filename = await uploadFile(req.files, undefined, 'imgs');
    res.json({
      filename,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const updateFile = async (req = request, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `User with id ${id} is missing`,
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Product with id ${id} is missing`,
        });
      }
      break;

    default:
      res.status(500).json({
        message: 'Ups I forget to evaluate this',
      });
      break;
  }

  // delete previous images

  if (model.img) {
    // delete image from server
    const imagePath = path.join(__dirname, '../uploads', collection, model.img);
    if(fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  filename = await uploadFile(req.files, undefined, collection);
  model.img = filename;

  await model.save();

  res.json(model);
};
const updateFileCloudinary = async (req = request, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `User with id ${id} is missing`,
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Product with id ${id} is missing`,
        });
      }
      break;

    default:
      res.status(500).json({
        message: 'Ups I forget to evaluate this',
      });
      break;
  }

  // delete previous images

  if (model.img) {
    // delete image from cloudinary
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length -1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  try {
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    res.json(model);
    
  } catch (error) {
    res.status(500).json({
      error
    })
  }


  
  // model.img = filename;

  // await model.save();

};


const getImage = async(req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `User with id ${id} is missing`,
        });
      }
      break;
      case 'products':
        model = await Product.findById(id);
        if (!model) {
        return res.status(400).json({
          message: `Product with id ${id} is missing`,
        });
      }
      break;

    default:
      res.status(500).json({
        message: 'Ups I forget to evaluate this',
      });
      break;
  }

  // delete previous images

  if (model.img) {
    // delete image from server
    const imagePath = path.join(__dirname, '../uploads', collection, model.img);
    if(fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const imagePath = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(imagePath);
}

module.exports = {
  loadFile,
  updateFile,
  getImage,
  updateFileCloudinary
};
