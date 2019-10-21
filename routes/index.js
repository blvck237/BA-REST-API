const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).send({ msg: "Welcome to Les Bons Artisans API" });
});

module.exports = router;
