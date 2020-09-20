const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Market = sequelize.define('markets', {
  name: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  business_name: Sequelize.STRING(256),
  social_reason: Sequelize.STRING(256),
  nit: Sequelize.STRING(10),
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
  id_organization: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

/* Market.assciate = ({ Organization }) => {
  Market.belongsTo(Organization, {
    foreginKey: 'organization_id',
    through: 'markets',
  })
} */

module.exports = Market