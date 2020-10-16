const moment = require('moment')
const sequelize = require('sequelize')
const { Sale, Shopping } = require('../database/models')

const Op = sequelize.Op

const months = {
  1: 'Ene',
  2: 'Feb',
  3: 'Mar',
  4: 'Abr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dic',
}

const reports = async () => {
  let currentMonth = (new Date().getMonth() + 1) - 5 < 0 ? (new Date().getMonth() + 1) + 5 : (new Date().getMonth() + 1) - 5
  let categoriesSale = {}
  let categoriesShop = {}

  for (let i=1; i < 7; i ++) {
    if (currentMonth > 12) {
      currentMonth = 1
    }
    categoriesSale = { ...categoriesSale, [months[currentMonth]]: { title: months[currentMonth], serie: 0 } }
    categoriesShop = { ...categoriesShop, [months[currentMonth]]: { title: months[currentMonth], serie: 0 } }
    currentMonth++
  }

  const sale = await Sale.findAll({ where: { createdAt: { [Op.gte]: moment().subtract(5, 'months').toDate() } }})
  const shop = await Shopping.findAll({ where: { createdAt: { [Op.gte]: moment().subtract(5, 'months').toDate() } }})

  if (sale) {
    sale.forEach(async (sal) => {
      const month = months[new Date(sal.createdAt).getMonth() + 1]
      categoriesSale[month] = { title: categoriesSale[month].title, serie: categoriesSale[month].serie + 1 }
    })
  }

  if (shop) {
    shop.forEach(async (shop) => {
      const month = months[new Date(shop.createdAt).getMonth() + 1]
      categoriesShop[month] = { title: categoriesShop[month].title, serie: categoriesShop[month].serie + 1 }
    })
  }

  const categories = Object.keys(categoriesSale)

  let report = {
    sale: {
      title: 'Ventas',
      categories,
      series: categories.map((e) => categoriesSale[e].serie),
    },
    shop: {
      title: 'Compras',
      categories,
      series: categories.map((e) => categoriesShop[e].serie),
    }
  }

  return report
}

module.exports = { reports }