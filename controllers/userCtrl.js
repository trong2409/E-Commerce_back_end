const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken.js");
const { validateId } = require("../utils/validateMongoDbID.js");

// Register user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const { _id, lastname, firstname, email, mobile, role, created_at } =
      findUser;
    res.json({
      _id,
      lastname,
      firstname,
      email,
      mobile,
      role,
      created_at,
      token: generateToken(_id),
    });
  } else throw new Error("Invalid Email or Password");
});

// Get all user
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    throw new Error(err);
  }
});

// Get a user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const findUser = await User.findOne({ _id: id });
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
});

// Get a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    throw new Error(err);
  }
});

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const { firstname, lastname, email, mobile } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        mobile,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});

// Block/Unblock a user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json(blockedUser);
  } catch (err) {
    throw new Error(err);
  }
});
const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const unBlockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json(unBlockedUser);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
};
