const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Provider = sequelize.define('providers', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING,
  business_name: Sequelize.STRING,
  social_reason: Sequelize.STRING,
  nit: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  mobile: Sequelize.STRING,
  photo: Sequelize.STRING,
  id_organization: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_market: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Provider