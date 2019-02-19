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
      productInCart.push(cart[i]);
    }
  }
  res.json(productInCart);
});

// Adds/Removes item with given product_id to cart of user with given user_id
router.post("/:user_id/:product_id", (req, res) => {
  const userId = Number(req.params.user_id);
  const productId = Number(req.params.product_id);
  const image = req.body.image;
  const option = req.body.option;
  if (option === "ADD") {
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
        product_id: productId,
        image: image
      });
    }

    res.json(cart[cart.length - 1]);
  } else if (option === "REMOVE") {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].user_id === userId && cart[i].product_id === productId) {
        if (cart[i].quantity != 0) {
          cart[i].quantity = cart[i].quantity - 1;
          found = true;
          res.json(cart[i]);
        }
      }
    }

    if (!found) {
      res.send("No such product in cart");
    }
  }
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
