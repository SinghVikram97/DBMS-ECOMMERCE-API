const router = require("express").Router();
const { Product } = require("../../db/models");
const { products } = require("../../data");

// Return all products in database
router.get("/", (req, res) => {
  // res.json(products);
  Product.findAll().then(products => {
    res.send(products);
  });
});

router.get("/:id", (req, res) => {
  let product_id = req.params.id;
  product_id = Number(product_id);
  // for (let i = 0; i < products.length; i++) {
  //   if (products[i].product_id == id) {
  //     res.json(products[i]);
  //   }
  // }
  console.log(product_id);
  Product.find({
    where: {
      product_id: product_id
    }
  }).then(product => {
    res.send(product);
  });

  // res.send("No product with given id found");
});

router.post("/create", (req, res) => {
  // product_id automatically given by db
  // product_id = products.length + 1;
  name = req.body.name;
  original_price = req.body.original_price;
  discounted_price = req.body.discounted_price;
  picture = req.body.picture;
  // categoryId = req.body.categoryId;
  // sellerId = req.body.sellerId;

  Product.create({
    name: name,
    original_price: original_price,
    discounted_price: discounted_price,
    picture: picture
    // categoryId: categoryId,
    // sellerId: sellerId
  }).then(product => {
    res.send(product);
  });

  // products.push({
  //   product_id,
  //   name,
  //   original_price,
  //   discounted_price,
  //   picture,
  //   categoryId,
  //   sellerId
  // });

  // res.json(products[products.length - 1]);
});

router.delete("/delete/:id", (req, res) => {
  const product_id = req.params.id;

  Product.destroy({
    where: {
      product_id: product_id
    }
  }).then(() => {
    res.send("Product Deleted");
  });

  // let pos = -1;
  // for (let i = 0; i < products.length; i++) {
  //   if (products[i].product_id == id) {
  //     pos = i;
  //     break;
  //   }
  // }
  // if (pos != -1) {
  //   products.splice(pos, 1);
  //   res.json(products);
  // } else {
  //   res.send("No product with given id found");
  // }
});

router.put("/update/:id", (req, res) => {
  const product_id = req.params.id;

  name = req.body.name;
  original_price = req.body.original_price;
  discounted_price = req.body.discounted_price;
  picture = req.body.picture;
  // categoryId = req.body.categoryId;
  // sellerId = req.body.sellerId;

  Product.update(
    {
      name: name,
      original_price: original_price,
      discounted_price: discounted_price,
      picture: picture
    },
    {
      where: {
        product_id: product_id
      }
    }
  ).then(() => {
    res.send("Sucessfully Updated");
  });
  // for (let i = 0; i < products.length; i++) {
  //   if (products[i].product_id == id) {
  //     products[i].name = name;
  //     products[i].original_price = original_price;
  //     products[i].discounted_price = discounted_price;
  //     products[i].picture = picture;
  //     products[i].categoryId = categoryId;
  //     products[i].sellerId = sellerId;
  //     res.json(products[i]);
  //   }
  // }
  // res.json("No product with given id found");
});

module.exports = router;
