const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  isAdmin,
  liketheBlog,
  disliketheBlog,
} = require("../middlewares/authMiddleWare");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
} = require("../controller/blogCtrl");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/", getAllBlog);
router.get("/:id", getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.put("/likes", authMiddleware, liketheBlog);
router.put("/dislikes", authMiddleware, disliketheBlog);

module.exports = router;
