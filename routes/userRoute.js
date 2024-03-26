const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth");
const userController = require("../controller/userController");

const router = express.Router();

router
  .route("/")
  .get(auth, restrictTo("Admin"), userController.getAllUsers)
  .post(userController.addUser);

router.route("/login").post(userController.login);

router.route("/deleteMe").delete(auth, userController.deleteUser);
router.route("/updateMe").patch(auth, userController.updateUser);
module.exports = router;
