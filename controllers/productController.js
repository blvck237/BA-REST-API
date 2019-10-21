/** GET ALL PRODUCTS */
exports.getAll = function(req, res) {
  try {
    const producTable = require("../database/products.json");
    console.log("Log: exports.getAll -> producTable", producTable);
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
    console.log("Log: exports.getAll -> producTable", producTable);
    if (producTable) {
      let availableProducts = producTable.filter(
        product => product.available === true
      );
      return res
        .status(200)
        .json({ data: availableProducts, count: producTable.length });
    }
  } catch (error) {
    console.log("Error::productController::getAll", error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
