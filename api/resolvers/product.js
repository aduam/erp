const { UserInputError } = require('apollo-server-micro')
const { TypeProduct, Product, Shopping, ProductShopping, Sale, SaleProduct, Customer, } = require('../database/models')
const sequelize = require('../database/connection')

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
  return product
}

const getProducts = async (_, args) => {
  const { id_market, id_organization } = args
  const products = await Product.findAll({ where: { id_market, id_organization } })
  if (!products) throw new UserInputError('Productos no existe')
  return products
}

const updateProduct = async (_, args) => {
  const { id_product, id_organization, id_market, product, id_type_product } = args
  const getProduct = await Product.findOne({ where: { id: id_product, id_organization, id_market } })
  if (!getProduct) throw new UserInputError('Productos no existe')
  await getProduct.update({ ...product, id_type_product })
  return getProduct
}

const removeProduct = async (_, { id }) => {
  const product = await Product.findOne({ where: { id } })
  if (!product) throw new UserInputError('Productos no existe')
  await product.destroy()
  return product
}

const shopingCreate = async (_, { id_market, id_status, products, recipe }) => {
  const shopping = await Shopping.create({ id_market, id_status, recipe })
  if (!shopping) throw new UserInputError('Error al crear la compra')
  await Promise.all(
    products.map((product) => ProductShopping.create({ ...product, id_shopping: shopping.id })),
  )
  return shopping.reload()
}

const shopingCancel = async (_, { id_shopping }) => {
  let isEnough = []
  const transaction = await sequelize.transaction()
  const shopping = await Shopping.findOne({ where: { id: id_shopping } })
  if (!shopping) throw new UserInputError('Error al buscar la compra')
  if (shopping.id_status === 2) {
    throw new UserInputError('La compra ya fue anulada')
  }
  const shopProduct = await ProductShopping.findAll({ where: { id_shopping } })
  if (!shopProduct) throw new UserInputError('Error al buscar los productos')
  shopProduct.forEach(async (prod) => {
    const product = await Product.findOne({ where: { id: prod.id_product } })
    if (!product) throw new UserInputError('No existe el producto')
    const stock = Number(product.stock) - Number(prod.amount)
    if (stock < 0) {
      isEnough.push(product.title)
    }
    await product.update({ stock }, { transaction })
  })
  await shopping.update({ id_status: 2 }, { transaction })

  if (isEnough.length > 0) {
    throw new UserInputError(`No hay existencia de los productos ${isEnough.join(', ')}`)
  } else {
    await transaction.commit()
  }
  return shopping
}

const saleCreate = async (_, { id_market, id_customer, id_status, products }) => {
  let isEnough = []
  let prods = []
  const transaction = await sequelize.transaction()

  const sale = await Sale.create({ id_market, id_customer, id_status })
  if (!sale) throw new UserInputError('Error al realizar la venta')

  await Promise.all(
    products.map((product) => {
      const sp = SaleProduct.create({ ...product, id_sale: sale.id }, { transaction })
      prods.push(sp)
      return sp
    }),
  )

  prods.forEach(async (prod) => {
    const product = await Product.findOne({ where: { id: prod.id_product } })
    if (!product) throw new UserInputError('No existe el producto')
    const stock = Number(product.stock) - Number(prod.amount)
    if (stock < 0) {
      isEnough.push(product.title)
    }
    await product.update({ stock }, { transaction })
  })

  if (isEnough.length > 0) {
    throw new UserInputError(`No hay existencia de los productos ${isEnough.join(', ')}`)
  } else {
    await transaction.commit()
  }
  return sale
}

const saleCancel = async (_, { id_sale }) => {
  const transaction = await sequelize.transaction()

  const sale = await Sale.findOne({ where: { id: id_sale } })
  if (!sale) throw new UserInputError('Error al buscar la sale')

  if (sale.id_status === 2) {
    throw new UserInputError('La venta ya fue anulada')
  }

  const saleProduct = await SaleProduct.findAll({ where: { id_sale } })
  if (!saleProduct) throw new UserInputError('Error al buscar los productos')

  saleProduct.forEach(async (prod) => {
    const product = await Product.findOne({ where: { id: prod.id_product } })
    if (!product) throw new UserInputError('No existe el producto')
    const stock = Number(product.stock) + Number(prod.amount)
    await product.update({ stock }, { transaction })
  })

  await sale.update({ id_status: 2 }, { transaction })
  await transaction.commit()
  return sale
}

module.exports = {
  createTypeProduct,
  createProduct,
  updateStock,
  getProducts,
  updateProduct,
  removeProduct,
  shopingCreate,
  shopingCancel,
  saleCreate,
  saleCancel,
}