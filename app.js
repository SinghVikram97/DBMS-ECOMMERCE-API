const express = require("express");
const app = express();
const productRouter = require("./routes/product-routes/product");

app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4444, () => {
  console.log("Server started on http://localhost:4444");
});
