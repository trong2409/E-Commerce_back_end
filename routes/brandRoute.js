const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandCtrl");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createBrand);
router.put("/:id", authMiddleWare, isAdmin, updateBrand);
router.delete("/:id", authMiddleWare, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;
