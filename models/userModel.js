const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (val) {
          return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val);
        },
        message: (props) => `${props.value} is invalid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
            val
          );
        },
        message: (props) =>
          `password should have upper and lower case letters, symbols and numbers`,
      },
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 15,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 15,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
