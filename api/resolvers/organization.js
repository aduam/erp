const { ApolloError } = require('apollo-server-micro')
const { Organization } = require('../database/models')

const createOrganization = async (_, args, ctx) => {
  const fields = Object.keys(args.organization)
  const organization = await Organization.create({ ...args.organization }, { fields })
  if (!organization) ApolloError('Error al crear organización', '200')
  return organization
}

const organization = async (root, { id }, ctx) => {
  const org = await Organization.findOne({ where: { id } })
  if (!org) throw Error('Error en la organización')
  return org
}

module.exports = {
  createOrganization,
  organization,
}