const Sequelize = require("sequelize");
const db = new Sequelize("shopdb", "shopdbadmin", "shopdbpass", {
  dialect: "mysql",
  host: "localhost"
});

const User = db.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
});

const Category = db.define("category", {
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50)
  }
});

const Seller = db.define("seller", {
  seller_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50)
  },
  phone: {
    type: Sequelize.BIGINT
  },
  address: {
    type: Sequelize.STRING(200)
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

const Product = db.define("product", {
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  original_price: {
    type: Sequelize.FLOAT
  },
  discounted_price: {
    type: Sequelize.FLOAT
  },
  picture: {
    type: Sequelize.STRING(500)
  }
  // Foreign keys
  // categoryId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Category,
  //     key: "category_id"
  //   }
  // },
  // sellerId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Seller,
  //     key: "seller_id"
  //   }
  // }
});

const Cart = db.define("cart", {
  cart_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "user_id"
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "product_id"
    }
  }
});

const Order = db.define("order", {
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "user_id"
    }
  },
  orderDate: {
    type: Sequelize.DATE
  },
  deliveryDate: {
    type: Sequelize.DATE
  },
  totalPrice: {
    type: Sequelize.FLOAT
  }
});

db.sync().then(() => {
  console.log("Database is Ready");
});

module.exports = { User, Product, Category, Seller, Cart, Order };
