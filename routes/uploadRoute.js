const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/",
  authMiddleWare,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleWare, isAdmin, deleteImages);

module.exports = router;
