const { verify } = require('jsonwebtoken')

const context = ctx => {
  const { req } = ctx
  const SECRET = process.env.SECRET || 'lo_mas_loco'
  const token = req.headers.authorization || null
  let payload
  let error
  if (token) {
    try {
      payload = verify(token, SECRET)
    } catch (e) {
      error = e
    }
  }

  return { token, payload, error }
}

module.exports = context