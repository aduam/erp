const { ApolloError } = require('apollo-server-micro')
const { Market, Organization } = require('../database/models')

const createMarket = async (root, args, ctx) => {
  const org = await Organization.findAll({ limit: 1 })
  if (!org || org.length < 1) throw Error('No existe organización', '200')
  const market = await Market.create({ ...args.market, id_organization: org[0].id })
  if (!market) ApolloError('Error al crear la tienda', '200')
  return market
}

module.exports = {
  createMarket,
}