const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/blogCatCtrl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createCategory);
router.put("/:id", authMiddleWare, isAdmin, updateCategory);
router.delete("/:id", authMiddleWare, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);

module.exports = router;
