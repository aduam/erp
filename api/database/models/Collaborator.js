const sequelize = require('../connection')
const Sequelize = require('sequelize')

const Collaborator = sequelize.define('collaborators', {
  names: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  surnames: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  identification: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  profile_photo: Sequelize.STRING(256),
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  id_role: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_market: Sequelize.INTEGER,
  id_organization: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoi: true,
  deleteAt: 'delete_at',
  underscored: true,
})

module.exports = Collaborator