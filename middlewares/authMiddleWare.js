const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleWare = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization || null;
  if (token) {
    try {
      const decode = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      throw new Error("Not Authorized, please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role === "admin") next();
  else throw new Error("No permission");
});

module.exports = { authMiddleWare, isAdmin };
