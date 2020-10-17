const { UserInputError } = require('apollo-server-micro')
const { Customer } = require('../database/models')


const customerCreate = async (_, args) => {
  const customer = await Customer.create({ ...args.customer })
  if (!customer) throw new UserInputError('Error al buscar el cliente')
  return customer
}

const customerUpdate = async (_, args) => {
  const customer = await Customer.findOne({ where: { id: args.id_customer } })
  if (!customer) throw new UserInputError('Error al buscar el cliente')
  await customer.update({ ...args.customer })
  return customer
}

const customerRemove = async (_, args) => {
  const customer = await Customer.findOne({ where: { id: args.id_customer } })
  if (!customer) throw new UserInputError('Error al buscar el cliente')
  await customer.destroy()
  return customer
}

module.exports = {
  customerCreate,
  customerUpdate,
  customerRemove,
}