const jwt = require("jsonwebtoken");
let { promisify } = require("util");
exports.auth = async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "you must login first" });
  }
  try {
    let decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );
    req.id = decoded.data.id;
    req.role = decoded.data.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "unauthorized" });
  }
};
exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "you dont have permission" });
    }
    next();
  };
};
