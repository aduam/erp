const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Status = sequelize.define('status', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
}, {
  timestamps: false,
  tableName: 'status'
})

module.exports = Status