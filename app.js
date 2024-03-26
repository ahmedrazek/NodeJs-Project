const express = require("express");

const userRoute = require("./routes/userRoute");
const sellerRoute = require("./routes/sellerRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();

app.use(express.json());

app.use("/user", userRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);

app.use("*", (req, res, next) => {
  console.log(req.url);
  console.log(req.originalUrl);
  res.status(404).json({ message: `you cant access ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});
module.exports = app;
