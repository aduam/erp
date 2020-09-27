require('dotenv').config()
const withFonts = require('next-fonts');

module.exports = withFonts({
  env: {
    ROOT: __dirname,
    URL: process.env.URL || 'http://localhost:3000/api/graphql',
    SECRET: process.env.SECRET || 'secret',
    SECRET_REFRESH: process.env.SECRET_REFRESH || 'secret_refresh',
    NAME_BUSINESS: process.env.NAME_BUSINESS || `Studios d' Leon`
  },
})