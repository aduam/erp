const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Customer = sequelize.define('customers', {
  names: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  surnames: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  nit: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  profile_photo: Sequelize.STRING(256),
  address: {
    type: Sequelize.TEXT,
  },
  phone: Sequelize.STRING(25,)
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Customer