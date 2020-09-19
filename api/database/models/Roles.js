const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Roles = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: Sequelize.STRING(256),
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Roles