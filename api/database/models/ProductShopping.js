const sequelize = require('../connection')
const Sequelize = require('sequelize')

const ProductShopping = sequelize.define('shoppings_products', {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  id_product: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_shopping: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = ProductShopping