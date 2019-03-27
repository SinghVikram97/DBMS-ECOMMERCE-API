const router = require("express").Router();
const { products, categories, cart } = require("../../data");
const fetch = require("node-fetch");
const { Cart } = require("../../db/models");
// Returns all cart items
router.get("/", (req, res) => {
  Cart.findAll().then(cart => {
    res.send(cart);
  });
  // res.json(cart);
});

// Returns all products in a users cart with given id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  Cart.findAll({
    where: {
      userId: userId
    }
  }).then(items => {
    res.send(items);
  });

  // const productInCart = [];
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].user_id == id) {
  //     productInCart.push(cart[i]);
  //   }
  // }
  // res.json(productInCart);
});

// Adds/Removes item with given product_id to cart of user with given user_id
router.post("/:user_id/:product_id", (req, res) => {
  const userId = Number(req.params.user_id);
  const productId = Number(req.params.product_id);
  const option = req.body.option;
  console.log("option", option);
  if (option === "ADD") {
    Cart.count({
      where: {
        userId: userId,
        productId: productId
      }
    }).then(count => {
      // Update quantity in db
      if (count != 0) {
        Cart.increment("qty", {
          where: {
            userId: userId,
            productId: productId
          }
        }).then(() => {
          res.send("Added to cart");
        });
      }
      // Add a fresh entry
      else {
        Cart.create({
          userId: userId,
          productId: productId,
          qty: 1
        }).then(item => {
          res.send(item);
        });
      }
    });
    // let found = false;
    // for (let i = 0; i < cart.length; i++) {
    //   if (cart[i].user_id === userId && cart[i].product_id === productId) {
    //     cart[i].qty = cart[i].qty + 1;
    //     found = true;
    //     break;
    //   }
    // }
    // if (!found) {
    //   cart.push({
    //     qty: 1,
    //     user_id: userId,
    //     product_id: productId,
    //     image: image
    //   });
    // }
    // res.json(cart[cart.length - 1]);
  } else if (option === "REMOVE") {
    Cart.count({
      where: {
        userId: userId,
        productId: productId
      }
    }).then(count => {
      if (count != 0) {
        Cart.find({
          where: {
            userId: userId,
            productId: productId
          }
        }).then(item => {
          if (item.qty == 1) {
            // Destroy
            Cart.destroy({
              where: {
                userId: userId,
                productId: productId
              }
            }).then(() => {
              res.send("Removed from cart");
            });
          } else {
            Cart.decrement("qty", {
              where: {
                userId: userId,
                productId: productId
              }
            }).then(() => {
              res.send("Removed a unit from cart");
            });
          }
        });
      } else {
        res.send("No such product in cart found");
      }
    });
  }
});

router.delete("/:user_id/:product_id", (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;

  Cart.destroy({
    where: {
      userId: userId,
      productId: productId
    }
  }).then(() => {
    res.send("Removed product from cart");
  });

  // let indexToDelete = -1;

  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].user_id == userId && cart[i].product_id == productId) {
  //     indexToDelete = i;
  //     break;
  //   }
  // }

  // if (indexToDelete == -1) {
  //   res.send("Invalid user_id or product_id");
  // } else {
  //   cart.splice(indexToDelete, 1);
  //   res.json(cart);
  // }
});

module.exports = router;
