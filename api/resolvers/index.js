const { UserInputError } = require('apollo-server-micro')
const { Market, Role, Collaborator, User, Provider } = require('../database/models')
const { createOrganization, organization } = require('./organization')
const { createMarket } = require('./market')
const { createCollaborator, createRole } = require('./collaborator')
const { login, me } = require('./me')
const { createProvider, removeProvider, editProvider } = require('./provider')

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
    createProvider,
    removeProvider,
    editProvider,
  },
  Organization: {
    markets: async ({ id }) => {
      const markets = await Market.findAll({ where: { id_organization: id } })
      if (!markets) throw new UserInputError('No existen tiendas')
      return markets
    },
    market: async (root, { id }, ctx) => {
      const market = await Market.findOne({ where: { id, id_organization: root.id } })
      if (!market) throw new UserInputError('No existen la tienda')
      return market
    },
    provider: async ({ id }, args) => {
      const provider = await Provider.findOne({ where: { id_organization: id, id: args.id } })
      if (!provider) throw new UserInputError('No existen la tienda')
      return provider
    },
    providers: async ({ id }) => {
      const providers = await Provider.findAll({ where: { id_organization: id } })
      if (!providers) throw new UserInputError('No existen la tienda')
      return providers
    },
  },
  Market: {
    collaborators: async ({ id }) => {
      const collaborators = await Collaborator.findAll({ where: { id_market: id } })
      if (!collaborators) throw new UserInputError('Error en colaboradores')
      return collaborators
    },
  },
  Collaborator: {
    role: async ({ id_role }) => {
      const role = await Role.findOne({ where: { id: id_role } })
      if (!role) throw new UserInputError('Error en el rol')
      return role
    },
    user: async ({ id }) => {
      const user = await User.findOne({ where: { id } })
      if (!user) throw new UserInputError('Error en el usuario')
      return user
    },
  },
  Me: {
    role: async ({ id_role }) => {
      const role = await Role.findOne({ where: { id: id_role } })
      if (!role) throw new UserInputError('Error en el rol')
      return role
    },
    user: async ({ id }) => {
      const user = await User.findOne({ where: { id } })
      if (!user) throw new UserInputError('Error en el usuario')
      return user
    },
  }
}

module.exports = resolvers