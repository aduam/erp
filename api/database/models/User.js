const sequelize = require('../connection')
const Sequelize = require('sequelize')

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
}, {
  paranoid: true,
  timestamps: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = User