const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
} = require("../controllers/userCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleWare.js");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.put("/:id", authMiddleware, isAdmin, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
