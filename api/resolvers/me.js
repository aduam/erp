const { UserInputError } = require('apollo-server-micro')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Client } = require('pg');
const { Collaborator, User } = require('../database/models')

const client = new Client({
  user: 'studios',
  host: 'localhost',
  database: 'studios',
  password: 'studios',
  port: 5425,
})

const login = async (_, { username, password }, ctx) => {
  const me = await User.findOne({ where: { username } })
  if (!me) throw new UserInputError('Usuario o contraseña incorrecta')

  const isUser = await bcrypt.compare(password, me.password)
  if (!isUser) throw new UserInputError('Usuario o contraseña incorrecta')

  const collaborator = await Collaborator.findOne({ where: { id: me.id } })
  if (!collaborator) throw new UserInputError('Collaborator no existe')

  const token = await jwt.sign({ id: collaborator.id }, process.env.SECRET, { expiresIn: '10h' })
  const refresh_token = await jwt.sign({ id: collaborator.id }, process.env.SECRET_REFRESH, { expiresIn: '12h' })
  const collaboratorWithTokens = { ...collaborator.toJSON(), token, refresh_token }
  ctx.payload = { ...jwt.verify(token, process.env.SECRET), token }
  return collaboratorWithTokens
}

const loginV2 = async (_, { username, password }, ctx) => {
  client.connect();
  const queryClientUser = await client.query(`select * from users where username='${username}' and password='${password}'`);
  console.log(queryClientUser)
  if (!(queryClientUser && queryClientUser.rows[0])) throw new UserInputError('Usuario o contraseña incorrecta');
  const me = queryClientUser.rows[0];

  const queryClientCollaborator = await client.query(`select * from collaborators where id=$1`, [me.id]);
  if (!(queryClientCollaborator && queryClientCollaborator.rows[0])) throw new UserInputError('Collaborator no existe')
  const collaborator = queryClientCollaborator.rows[0];

  const token = await jwt.sign({ id: collaborator.id }, process.env.SECRET, { expiresIn: '10h' })
  const refresh_token = await jwt.sign({ id: collaborator.id }, process.env.SECRET_REFRESH, { expiresIn: '12h' })
  const collaboratorWithTokens = { ...collaborator, token, refresh_token }
  ctx.payload = { ...jwt.verify(token, process.env.SECRET), token }
  client.end();
  return collaboratorWithTokens
}

const me = async (_, __, ctx) => {
  const userId = ctx.payload.id
  const me = await Collaborator.findOne({ where: { id: userId } })
  return me
}

module.exports = {
  login,
  me,
  loginV2,
}