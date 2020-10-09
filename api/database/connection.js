const Sequelize = require('sequelize')

const DB_USER = process.env.DB_USER || 'studios'
const DB_PASSWORD = process.env.DB_PASSWORD || 'studios'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_NAME = process.env.DB_NAME || 'studios'

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: '5425',
    dialect: 'postgres',
    pool: {
      max: 5,
      require: 30000,
      idle: 10000,
    },
    logging: false,
  }
)

module.exports = sequelize