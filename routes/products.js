const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

/** GET ALL PRODUCTS */
router.get('/', auth, productController.getAll);

/** GET ALL AVAILBLE PRODUCTS */
router.get('/available', auth, productController.getAvailable);

/** CREATE PRODUCT */
router.post('/', auth, productController.create);

/** UPDATE PRODUCT */
router.patch('/:productID', auth, productController.update);

/** DELETE PRODUCT */
router.delete('/:productID', auth, productController.delete);

module.exports = router;
