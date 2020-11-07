const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Paid = sequelize.define('paids', {
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  id_account: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Paid