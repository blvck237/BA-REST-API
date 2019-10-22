/** GET ALL PRODUCTS */
exports.getAll = function(req, res) {
  try {
    const producTable = require("../database/products.json");
    if (producTable)
      return res
        .status(200)
        .json({ data: producTable, count: producTable.length });
  } catch (error) {
    console.log("Error::productController::getAll", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.getAvailable = function(req, res) {
  try {
    const producTable = require("../database/products.json");
    if (producTable) {
      let availableProducts = producTable.filter(
        product => product.available === true
      );
      return res
        .status(200)
        .json({ data: availableProducts, count: producTable.length });
    }
  } catch (error) {
    console.log("Error::productController::getAvailable", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.update = function(req, res) {
  const productID = parseInt(req.params.productID);
  const newData = req.body;
  try {
    const producTable = require("../database/products.json");
    let product = producTable.find(item => {
      return item._id === productID;
    });
    if (product) {
      product = { ...product, ...newData };
      return res.status(200).json({ data: product });
    }
    return res.status(400).json({ Error: "Product not found" });
  } catch (error) {
    console.log("Error::productController::update", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

/** THIS IS A SOFT DELETE I.E WE ARE NOT DELETING
 *  THE PRODUCT BUT WE WILL TOGGLE
 *  ITS AVAILABILITY TO FALSE
 */
exports.delete = function(req, res) {
  const productID = parseInt(req.params.productID);
  try {
    const producTable = require("../database/products.json");
    let product = producTable.find(item => {
      return item._id === productID;
    });
    if (product) {
      product.available = false;
      return res.status(200).json({ data: product });
    }
    return res.status(400).json({ Error: "Product not found" });
  } catch (error) {
    console.log("Error::productController::update", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
