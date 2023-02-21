const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
} = require("../controller/blogCtrl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleWare,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddleWare, liketheBlog);
router.put("/dislikes", authMiddleWare, disliketheBlog);

router.put("/:id", authMiddleWare, isAdmin, updateBlog);

router.get("/:id", getBlog);
router.get("/", getAllBlogs);

router.delete("/:id", authMiddleWare, isAdmin, deleteBlog);

module.exports = router;
