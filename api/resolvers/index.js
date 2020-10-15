const { UserInputError } = require('apollo-server-micro')
const sequelize = require('../database/connection')
const { Status, Market, Role, Collaborator, User, Provider, Product, TypeProduct, Shopping } = require('../database/models')
const { createOrganization, organization } = require('./organization')
const { createMarket } = require('./market')
const { createCollaborator, createRole } = require('./collaborator')
const { login, me } = require('./me')
const { createProvider, removeProvider, editProvider } = require('./provider')
const {
  createTypeProduct,
  createProduct,
  updateStock,
  getProducts,
  updateProduct,
  removeProduct,
  shopingCreate,
} = require('./product')

const resolvers = {
  Query: {
    organization,
    me,
    products: getProducts,
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
    createTypeProduct,
    createProduct,
    updateProduct,
    removeProduct,
    updateStock,
    shopingCreate,
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
    type_products: async ({ id }) => {
      const type_products = await TypeProduct.findAll({ where: { id_organization: id } })
      if (!type_products) throw new UserInputError('Error en el tipo de productos')
      return type_products
    },
  },
  Market: {
    collaborators: async ({ id }) => {
      const collaborators = await Collaborator.findAll({ where: { id_market: id } })
      if (!collaborators) throw new UserInputError('Error en colaboradores')
      return collaborators
    },
    products: async ({ id, id_organization }) => {
      const products = await Product.findAll({ where: { id_market: id, id_organization } })
      if (!products) throw new UserInputError('Error al buscar los productos')
      return products
    },
    product: async ({ id, id_organization }, args) => {
      const products = await Product.findOne({ where: { id_market: id, id_organization, id: args.id } })
      if (!products) throw new UserInputError('Error al buscar los productos')
      return products
    },
    shoppings: async ({ id }) => {
      const shoppings = await Shopping.findAll({ where: { id_market: id } })
      if (!shoppings) throw new UserInputError('Error al buscar las compras')
      return shoppings
    },
    shopping: async ({ id }, args) => {
      const shopping = await Shopping.findOne({ where: { id_market: id, id: args.id } })
      if (!shopping) throw new UserInputError('Error al buscar la compra')
      return shopping
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
  },
  Provider: {
    products: async ({ id }) => {
      const products = await Product.findAll({ where: { id_provider: id } })
      if (!products) throw new UserInputError('Error en los productos')
      return products
    },
  },
  Shopping: {
    products: async ({ id }) => {
      const [results] = await sequelize.query(`SELECT * from products P INNER JOIN shoppings_products SP on P.id = SP.id_product WHERE SP.id_shopping = ${id}`);
      if (!results) throw new UserInputError('Error en productos')
      return results
    },
    status: async ({ id_status }) => {
      const status = await Status.findOne({ where: { id: id_status } })
      if (!status) throw new UserInputError('Error en el status')
      return status
    },
  }
}

module.exports = resolvers