const router = require("express").Router();
const { products, categories, cart } = require("../../data");

// Returns all cart items
router.get("/", (req, res) => {
  res.json(cart);
});

// Returns all products in a users cart with given id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const productInCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].user_id == id) {
      for (let j = 0; j < products.length; j++) {
        if (cart[i].product_id == products[j].product_id) {
          productInCart.push({
            product: products[j],
            quantity: cart[i].qty
          });
        }
      }
    }
  }
  res.json(productInCart);
});

// Adds item with given product_id to cart of user with given user_id
router.post("/:user_id/:product_id", (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;
  let quantity = 0;
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].user_id === userId && cart[i].product_id === productId) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({
      qty: 1,
      user_id: userId,
      product_id: productId
    });
  }

  res.json(cart[cart.length - 1]);
});

router.put("/:user_id/:product_id", (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;

  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].user_id === userId && cart[i].product_id === productId) {
      cart[i] += 1;
      found = true;
      res.send(cart[i]);
      break;
    }
  }
  if (!found) {
    res.json("Invalid userId or productId");
  }
});

router.delete("/:user_id/:product_id", (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;
  let indexToDelete = -1;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].user_id == userId && cart[i].product_id == productId) {
      indexToDelete = i;
      break;
    }
  }

  if (indexToDelete == -1) {
    res.send("Invalid user_id or product_id");
  } else {
    cart.splice(indexToDelete, 1);
    res.json(cart);
  }
});

module.exports = router;
