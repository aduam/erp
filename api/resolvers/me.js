const { UserInputError } = require('apollo-server-micro')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Collaborator, User } = require('../database/models')

const login = async (_, { username, password }, ctx) => {
  const me = await User.findOne({ where: { username } })
  if (!me) throw new UserInputError('Usuario o contraseña incorrecta')

  const isUser = await bcrypt.compare(password, me.password)
  console.log(isUser, password, me.password)
  if (!isUser) throw new UserInputError('Usuario o contraseña incorrecta')

  const collaborator = await Collaborator.findOne({ where: { id: me.id } })
  if (!collaborator) throw new UserInputError('Collaborator no existe')

  const token = await jwt.sign({ id: collaborator.id }, 'secret', { expiresIn: '6h' })
  const refresh_token = await jwt.sign({ id: collaborator.id }, 'secret-refresh', { expiresIn: '12h' })
  const collaboratorWithTokens = { ...collaborator.toJSON(), token, refresh_token }
  ctx.payload = { ...jwt.verify(token, 'secret'), token }
  return collaboratorWithTokens
}

const me = async (_, __, ctx) => {
  const me = await User.findAll({ limit: 1 })
  return me[0]
}

module.exports = {
  login,
  me,
}