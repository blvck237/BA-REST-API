const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/** GET ALL PRODUCTS */
router.get("/", productController.getAll);

/** GET ALL AVAILBLE PRODUCTS */
router.get("/available", productController.getAvailable);

/** CREATE PRODUCT */
router.post("/", productController.create);

/** UPDATE PRODUCT */
router.patch("/:productID", productController.update);

/** DELETE PRODUCT */
router.delete("/:productID", productController.delete);

module.exports = router;
