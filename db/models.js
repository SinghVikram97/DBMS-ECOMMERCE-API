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
