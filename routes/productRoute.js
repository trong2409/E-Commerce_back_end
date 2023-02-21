const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleWare, addToWishlist);
router.put("/rating", authMiddleWare, rating);

router.put("/:id", authMiddleWare, isAdmin, updateProduct);
router.delete("/:id", authMiddleWare, isAdmin, deleteProduct);

router.get("/", getAllProduct);

module.exports = router;
