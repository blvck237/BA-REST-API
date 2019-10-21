const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/** GET ALL PRODUCTS */
router.get("/", productController.getAll);

/** GET ALL AVAILBLE PRODUCTS */
router.get("/available", productController.getAvailable);

module.exports = router;