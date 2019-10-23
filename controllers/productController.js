/** GET ALL PRODUCTS */
exports.getAll = (req, res) => {
  try {
    const producTable = require('../database/products.json');
    if (producTable)
      return res
        .status(200)
        .json({ data: producTable, count: producTable.length });
  } catch (error) {
    console.log('Error::productController::getAll', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.getAvailable = (req, res) => {
  try {
    const producTable = require('../database/products.json');
    if (producTable) {
      let availableProducts = producTable.filter(
        product => product.available === true
      );
      return res
        .status(200)
        .json({ data: availableProducts, count: producTable.length });
    }
  } catch (error) {
    console.log('Error::productController::getAvailable', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.create = async (req, res) => {
  try {
    const producTable = require('../database/products.json');
    const lastID = producTable[producTable.length - 1]._id;
    /** SINCE WE GOT NO MODEL, I DECIDED TO CREATE IT HERE DIRECTLY */
    const newProduct = {
      _id: lastID + 1, // This Autoincrement will be vailable since we have no hard delete (not a good way)
      name: req.body.name || '',
      type: req.body.type || '',
      price: req.body.price || '',
      rating: 0,
      warranty_years: req.body.warranty_years || '',
      available: true, // Available set to true by default
    };
    /** CHECKING IF THE DATA SENT BY THE USER CONTAINS ALL NECESSARY FIELDS */
    const error = await new Promise((resolve, reject) => {
      Object.keys(newProduct).map(key => {
        if (newProduct[key] === '') {
          reject(key);
        }
      });
      resolve(null);
    });
    if (error)
      return res.status(400).json({ Error: `Please enter a ${error}` });

    producTable.push(newProduct);
    return res
      .status(200)
      .json({ data: producTable, count: producTable.length });
  } catch (error) {
    console.log('Error::productController::create', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.update = (req, res) => {
  const productID = parseInt(req.params.productID);
  const newData = req.body;
  try {
    const producTable = require('../database/products.json');
    let product = producTable.find(item => {
      return item._id === productID;
    });
    if (product) {
      product = { ...product, ...newData };
      return res.status(200).json({ data: product });
    }
    return res.status(400).json({ Error: 'Product not found' });
  } catch (error) {
    console.log('Error::productController::update', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

/** THIS IS A SOFT DELETE I.E WE ARE NOT DELETING
 *  THE PRODUCT BUT WE WILL TOGGLE
 *  ITS AVAILABILITY TO FALSE
 */
exports.delete = (req, res) => {
  const productID = parseInt(req.params.productID);
  try {
    const producTable = require('../database/products.json');
    let product = producTable.find(item => {
      return item._id === productID;
    });
    if (product) {
      product.available = false;
      return res.status(200).json({ data: product });
    }
    return res.status(400).json({ Error: 'Product not found' });
  } catch (error) {
    console.log('Error::productController::delete', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
