const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json({
      status: "success",
      data: sellers,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.id);
    seller.products = await Product.find({ sellerId: req.id });
    console.log(seller.products);
    res.status(200).json({
      status: "success",
      data: seller,
    });
  } catch (err) {
    next(err);
  }
};
exports.addSeller = async (req, res, next) => {
  try {
    const newSeller = await Seller.create(req.body);
    res.status(201).json({
      status: "success",
      data: newSeller,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "you must provide email and password" });
    }
    let seller = await Seller.findOne({ email: email });

    if (!seller) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    let isValid = await bcrypt.compare(password, seller.password);

    if (!isValid) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    let token = jwt.sign(
      {
        data: { email: seller.email, id: seller.id, role: seller.role },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteSeller = async (req, res, next) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.id);
    res.status(204).json({
      status: "success",
      data: deletedSeller,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSeller = async (req, res, next) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(req.id, req.body);
    res.status(200).json({
      status: "success",
      data: updatedSeller,
    });
  } catch (err) {
    next(err);
  }
};
