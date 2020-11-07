const sequelize = require('../connection')
const Sequelize = require('sequelize')

const ProjectionFee = sequelize.define('projection_fees', {
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  due_date: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  paid: Sequelize.FLOAT,
  id_account: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
})

module.exports = ProjectionFee