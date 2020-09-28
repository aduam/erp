const Sequelize = require('sequelize')
const sequelize = require('../connection')

const Product = sequelize.define('products', {
  code: Sequelize.STRING(50),
  title: Sequelize.STRING(100),
  description: Sequelize.TEXT,
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  min_stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  base_price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  gain: Sequelize.DECIMAL,
  id_type_product: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_provider: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_organization: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_market: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Product