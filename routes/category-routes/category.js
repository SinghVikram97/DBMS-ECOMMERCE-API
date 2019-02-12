const router = require("express").Router();
const { categories } = require("../../data");
const { products } = require("../../data");

// Return all categories
router.get("/", (req, res) => {
  res.json(categories);
});

// Get category with given id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id == id) {
      res.json(categories[i].name);
    }
  }
  res.json("No category with given id");
});

// List all products with given category
router.get("/:id/products", (req, res) => {
  const selectedProducts = [];

  const id = req.params.id;
  for (let i = 0; i < products.length; i++) {
    if (products[i].categoryId == id) {
      selectedProducts.push(products[i]);
    }
  }

  res.json(selectedProducts);
});

module.exports = router;
