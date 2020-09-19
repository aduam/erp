const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Market = sequelize.define('Market', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  business_name: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  social_reason: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  nit: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  photo: Sequelize.STRING(256),
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  tableName: 'organizations',
  underscored: true,
})

/* Market.assciate = ({ Organization }) => {
  Market.belongsTo(Organization, {
    foreginKey: 'organization_id',
    through: 'markets',
  })
} */

module.exports = Market