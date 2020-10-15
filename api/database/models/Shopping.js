const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Shopping = sequelize.define('shoppings', {
  recipe: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id_market: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Shopping