const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const productRouter = require("./routes/product-routes/product");
const categoriesRouter = require("./routes/category-routes/category");
const cartRouter = require("./routes/cart-routes/cart-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/product", productRouter);
app.use("/categories", categoriesRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4444, () => {
  console.log("Server started on http://localhost:4444");
});
