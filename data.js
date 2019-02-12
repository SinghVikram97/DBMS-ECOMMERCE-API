let products = [
  {
    product_id: 1,
    name: "Moto G3",
    original_price: 13000,
    discounted_price: 10000,
    picture: "https://i.ibb.co/tc1PzwW/motog3.png",
    categoryId: 1,
    sellerId: 4
  },
  {
    product_id: 2,
    name: "iPhone 6s",
    original_price: 30000,
    discounted_price: 25000,
    picture: "https://i.ibb.co/SQjc0Z1/iphone.jpg",
    categoryId: 1,
    sellerId: 2
  },
  {
    product_id: 3,
    name: "Toshiba Hardisk",
    original_price: 4000,
    discounted_price: 3000,
    picture: "https://i.ibb.co/gtjXQXw/hardisk.jpg",
    categoryId: 2,
    sellerId: 5
  },
  {
    product_id: 4,
    name: "Boat Rockerz 400",
    original_price: 1500,
    discounted_price: 1000,
    picture: "https://i.ibb.co/D1mbkhk/headphones.jpg",
    categoryId: 2,
    sellerId: 2
  }
];

let categories = [
  {
    id: 1,
    name: "Mobiles"
  },
  {
    id: 2,
    name: "Electronics"
  },
  {
    id: 3,
    name: "Men's Fashion"
  },
  {
    id: 4,
    name: "Women's Fashion"
  },
  {
    id: 5,
    name: "Home"
  },
  {
    id: 6,
    name: "Beauty"
  },
  {
    id: 7,
    name: "Sports"
  },
  {
    id: 8,
    name: "Books"
  }
];

let cart = [
  {
    qty: 2,
    user_id: 1,
    product_id: 1
  },
  {
    qty: 1,
    user_id: 1,
    product_id: 4
  },
  {
    qty: 2,
    user_id: 2,
    product_id: 2
  }
];

module.exports = {
  products,
  categories,
  cart
};
