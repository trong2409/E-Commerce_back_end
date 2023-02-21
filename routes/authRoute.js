const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controller/userCtrl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleWare, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleWare, userCart);
router.post("/cart/applycoupon", authMiddleWare, applyCoupon);
router.post("/cart/cash-order", authMiddleWare, createOrder);
router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleWare, getOrders);
router.get("/getallorders", authMiddleWare, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleWare, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleWare, getWishlist);
router.get("/cart", authMiddleWare, getUserCart);

router.get("/:id", authMiddleWare, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleWare, emptyCart);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  authMiddleWare,
  isAdmin,
  updateOrderStatus
);
router.put("/edit-user", authMiddleWare, updatedUser);
router.put("/save-address", authMiddleWare, saveAddress);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unblockUser);

module.exports = router;
