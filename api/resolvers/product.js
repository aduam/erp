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
  console.log('args', args)
  console.log('variables: ', { ...args.product, id_type_product, id_provider, id_organization, id_market })
  let product
  try {
    product = await Product.create({ ...args.product, id_type_product, id_provider, id_organization, id_market })
  } catch (error) {
    console.log(error)
  }
  if (!product) throw new UserInputError('Error al crear el producto')
  console.log(product)
  return product
}

module.exports = {
  createTypeProduct,
  createProduct,
}