const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/** GET ALL PRODUCTS */
router.get("/", productController.getAll);

module.exports = router;