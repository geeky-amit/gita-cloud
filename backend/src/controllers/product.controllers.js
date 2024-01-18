const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const mongodb = require("mongodb");

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body;

  if (!name || !price || !category || !description) {
    throw new Error("Please enter all the required fields");
  }

  // const data = await Product.find({ name });

  // if (data) {
  //   return res.status(400).json({ message: "Product already exists" });
  // }

  const product = await Product.create({
    name,
    price,
    category,
    description
  });

  if (!product) {
    res.status(400);
    throw new Error("Failed to create Product");
  }

  res.status(201).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();

  if (!product) {
    res.status(500);
    throw new Error("No products found");
  }

  res.status(200).json(product);
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params;

  if (id) {
    const data = await Product.findOne({ _id: new mongodb.ObjectId(id) });
    res.status(200).json(data);
  } else {
    res.status(500);
    throw new Error("No Product found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  if (_id) {
    const productDetails = req.body;
    const product = await Product.findByIdAndUpdate(_id, productDetails, {
      new: true
    });

    res.status(200).json(product);
  } else {
    res.status(500);
    throw new Error("Something wend wrong");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id) {
    const data = await Product.deleteOne({ _id: new mongodb.ObjectId(id) });
    res.status(200).json(data);
  } else {
    res.status(500);
    throw new Error("Something wend wrong");
  }
});

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductById
};
