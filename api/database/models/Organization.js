const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Organization = sequelize.define('organizations', {
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
  underscored: true,
})

/* Organization.assciate = ({ Market }) => {
  Organization.hasMany(Market, {
    foreginKey: 'organization_id',
    through: 'markets',
  })
} */

module.exports = Organization