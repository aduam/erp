const { UserInputError } = require('apollo-server-micro')
const { Market, Organization } = require('../database/models')

const createMarket = async (root, args, ctx) => {
  const org = await Organization.findOne({ id: args.id_organization })
  if (!org) throw Error('No existe organización', '200')
  const market = await Market.create({ ...args.market, id_organization: args.id_organization })
  if (!market) throw new UserInputError('Error al crear la tienda')
  return market
}

module.exports = {
  createMarket,
}