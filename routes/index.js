const { Router } = require("express");
const Product = require("../models/Product");
const router = Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("home", {
    title: "Главная",
    products,
  });
});

module.exports = router;
