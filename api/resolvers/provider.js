import { UserInputError } from 'apollo-server-micro'
import { Provider } from '../database/models'

const createProvider = async (_, args, ctx) => {
  const provider = await Provider.create({ ...args.provider, id_organization: args.id_organization, id_market: args.id_market })

  if (!provider) {
    throw new UserInputError('no se pudo crear el proveedor')
  }
  return provider
}

const removeProvider = async (_, args, ctx) => {
  const provider = await Provider.findOne({ where: { id: args.id } })
  if (!provider) {
    throw new UserInputError('no se pudo encontrar el proveedor')
  }
  await provider.destroy()
  return provider
}

const editProvider = async (_, args, ctx) => {
  const provider = await Provider.findOne({ where: { id: args.id_provider } })
  if (!provider) {
    throw new UserInputError('no se pudo encontrar el proveedor')
  }
  await provider.update({ ...args.provider })
  return provider.reload()
}

module.exports = {
  createProvider,
  removeProvider,
  editProvider,
}