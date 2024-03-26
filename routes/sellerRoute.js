const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth");
const sellerController = require("../controller/sellerController");

const router = express.Router();

router
  .route("/")
  .get(auth, restrictTo("Admin"), sellerController.getAllSellers)
  .post(auth, restrictTo("Admin"), sellerController.addSeller);

router.post("/login", sellerController.login);

router.route("/deleteMe").delete(auth, sellerController.deleteSeller);
router.route("/updateMe").patch(auth, sellerController.updateSeller);
router.route("/profile").get(auth, sellerController.getSeller);
module.exports = router;
