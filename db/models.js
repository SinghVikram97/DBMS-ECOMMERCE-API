const Sequelize = require("sequelize");
const db = new Sequelize(
  "ecommerce-cart",
  "ecommerce-admin",
  "ecommerce-pass",
  {
    dialect: "mysql",
    host: "localhost"
  }
);

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
  },
  phone: {
    type: Sequelize.BIGINT
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
    type: Sequelize.STRING(50)
  },
  // Foreign keys
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: "category_id"
    }
  },
  sellerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Seller,
      key: "seller_id"
    }
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

const Sellor = db.define("sellor", {
  sellor_id: {
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
      model: user,
      key: "user_id"
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: "product",
      key: product_id
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
      model: "user",
      key: user_id
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
