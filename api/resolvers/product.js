const { UserInputError } = require('apollo-server-micro')
const { TypeProduct, Product } = require('../database/models')

const createTypeProduct = async (_, args) => {
  const typeProduct = await TypeProduct.create({ ...args })
  if (!typeProduct) {
    throw new UserInputError('Error al crear tipo de producto')
  }
  return typeProduct
}

const createProduct = async (_, args) => {
  const { id_type_product, id_provider, id_organization, id_market } = args
  const product = await Product.create({ ...args.product, id_type_product, id_provider, id_organization, id_market })
  if (!product) throw new UserInputError('Error al crear el producto')
  return product
}

const updateStock = async (_, args) => {
  const { id_product, id_organization, id_market, id_provider, amount } = args
  const product = await Product.findOne({ where: { id: id_product, id_organization, id_market, id_provider } })
  if (!product) throw new UserInputError('Producto no existe')
  const stock = product.stock + amount
  await product.update({ stock })
  return product.reload()
}

module.exports = {
  createTypeProduct,
  createProduct,
  updateStock,
}