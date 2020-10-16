const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Sale = sequelize.define('sales', {
  id_customer: {
    type: Sequelize.STRING,
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

module.exports = Sale