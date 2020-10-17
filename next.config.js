require('dotenv').config()
const withFonts = require('next-fonts');

module.exports = withFonts({
  env: {
    ROOT: __dirname,
    URL: process.env.URL || 'http://localhost:4000/api/graphql',
    SECRET: process.env.SECRET || 'lo_mas_loco',
    SECRET_REFRESH: process.env.SECRET_REFRESH || 'lo_mas_loco_refresh',
    NAME_BUSINESS: process.env.NAME_BUSINESS || `Studios d' Leon`,
    DB_USER: process.env.DB_USER || 'studios',
    DB_PASSWORD: process.env.DB_PASSWORD || 'studios',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'studios',
    DB_PORT: process.env.DB_PORT || '5425',
  },
})