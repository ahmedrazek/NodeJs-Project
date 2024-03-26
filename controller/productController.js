const Product = require("../models/productModel");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = { ...req.body };
    product.sellerId = req.id;
    const newProduct = await Product.create(product);
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
exports.editProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id, sellerId: req.id },
      req.body
    );
    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.deleteOne({
      _id: req.params.id,
      sellerId: req.id,
    });
    console.log(deletedProduct);
    res.status(200).json({
      status: "success",
      data: deletedProduct,
    });
  } catch (err) {
    next(err);
  }
};
