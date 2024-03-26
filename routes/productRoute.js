const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth");
const productController = require("../controller/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(auth, restrictTo("Seller"), productController.addProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(auth, restrictTo("Seller"), productController.editProduct)
  .delete(auth, restrictTo("Seller"), productController.deleteProduct);
module.exports = router;
