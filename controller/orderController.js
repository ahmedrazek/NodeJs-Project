const Order = require("../models/orderModel");

exports.getUserOrder = async (req, res, next) => {
  try {
    const userOrder = await Order.find({ userId: req.id });
    res.status(200).json({
      status: "success",
      data: userOrder,
    });
  } catch (err) {
    next(err);
  }
};
exports.makeOrder = async (req, res, next) => {
  try {
    const products = req.body;
    products.userId = req.id;
    const newOrder = await Order.create(products);

    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
};
