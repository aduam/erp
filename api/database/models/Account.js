const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Account = sequelize.define('accounts', {
  term: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  interest: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  debit: Sequelize.FLOAT,
  id_customer: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Account