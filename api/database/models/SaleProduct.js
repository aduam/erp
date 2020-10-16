const sequelize = require('../connection')
const Sequelize = require('sequelize')

const SaleProduct = sequelize.define('sales_products', {
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
  id_sale: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = SaleProduct