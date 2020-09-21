const { Market, Role, Collaborator, User } = require('../database/models')
const { createOrganization, organization } = require('./organization')
const { createMarket } = require('./market')
const { createCollaborator, createRole } = require('./collaborator')
const { login, me } = require('./me')

const resolvers = {
  Query: {
    organization,
    me,
  },
  Mutation: {
    createOrganization,
    createMarket,
    createCollaborator,
    createRole,
    login,
  },
  Organization: {
    markets: async ({ id }) => {
      const markets = await Market.findAll({ where: { id_organization: id } })
      if (!markets) throw Error('No existen tiendas')
      return markets
    },
    market: async (root, { id }, ctx) => {
      const market = await Market.findOne({ where: { id, id_organization: root.id } })
      if (!market) throw Error('No existen la tienda')
      return market
    },
  },
  Market: {
    collaborators: async ({ id }) => {
      const collaborators = await Collaborator.findAll({ where: { id_market: id } })
      if (!collaborators) throw Error('Error en colaboradores')
      return collaborators
    },
  },
  Collaborator: {
    role: async ({ id_role }) => {
      const role = await Role.findOne({ where: { id: id_role } })
      if (!role) throw Error('Error en el rol')
      return role
    },
    user: async ({ id }) => {
      const user = await User.findOne({ where: { id } })
      if (!user) throw Error('Error en el usuario')
      return user
    },
  },
  Me: {
    role: async ({ id_role }) => {
      const role = await Role.findOne({ where: { id: id_role } })
      if (!role) throw Error('Error en el rol')
      return role
    },
    user: async ({ id }) => {
      const user = await User.findOne({ where: { id } })
      if (!user) throw Error('Error en el usuario')
      return user
    },
  }
}

module.exports = resolvers