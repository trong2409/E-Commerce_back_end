const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorCtrl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createColor);
router.put("/:id", authMiddleWare, isAdmin, updateColor);
router.delete("/:id", authMiddleWare, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;
