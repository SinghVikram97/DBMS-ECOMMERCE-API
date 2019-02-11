const router = require("express").Router();
const { Product } = require("../../db/models");

router.get("/", (req, res) => {
  res.send("All products");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send("Search in database with given product id");
});

router.post("/create", (req, res) => {
  res.send("Post request to add a product");
});

router.delete("/delete/:id", (req, res) => {
  res.send("Delete product with given id");
});

router.put("/update/:id", (req, res) => {
  res.send("Update product with given id");
});

module.exports = router;
