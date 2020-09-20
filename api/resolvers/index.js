const { Market } = require('../database/models')
const { createOrganization, organization } = require('./organization')
const { createMarket } = require('./market')

const resolvers = {
  Query: {
    organization,
  },
  Mutation: {
    createOrganization,
    createMarket,
  },
  Organization: {
    markets: async ({ id }, args, ctx) => {
      const markets = await Market.findAll({ where: { id } })
      if (!markets) throw Error('No existen tiendas')
      return markets
    },
    market: async (root, { id }, ctx) => {
      const market = await Market.findOne({ where: { id, id_organization: root.id } })
      if (!market) throw Error('No existen la tienda')
      return market
    },
  }
}

module.exports = resolvers