const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth");
const orderController = require("../controller/orderController");
const router = express.Router();

router
  .route("/")
  .get(auth, orderController.getUserOrder)
  .post(auth, orderController.makeOrder);
module.exports = router;
