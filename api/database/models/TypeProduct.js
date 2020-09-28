const Sequelize = require('sequelize')
const sequelize = require('../connection')

const TypeProduct = sequelize.define('type_products', {
  title: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: Sequelize.STRING,
  id_organization: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = TypeProduct