const bcrypt = require('bcrypt')
const { Collaborator, Role, User } = require('../database/models')

const createCollaborator = async (_, args, ctx) => {
  const SALT = 7
  const collaborator = await Collaborator.create({ ...args.collaborator, id_role: args.id_role, id_market: args.id_market, active: true, id_organization: args.id_organization })
  if (!collaborator) throw Error('Error al crear el colaborador')
  const pass = await bcrypt.hash(args.username, SALT)
  const user = await User.create({ id: collaborator.id, username: args.username, password: pass })
  if (!user) throw Error(`Error al crear el usuario: ${args.username}`)
  return collaborator
}

const createRole = async (_, args, ctx) => {
  const role = await Role.create({ ...args })
  if (!role) throw Error('Error al crear el rol')
  return role
}

const updateCollaborator = async (_, args) => {
  const collaborator = await Collaborator.findOne({ where: { id: args.id_collaborator, id_market: args.id_market, id_organization: args.id_organization } })
  if (!collaborator) throw Error('Error al encontrar el colaborador')
  await collaborator.update({ ...args.collaborator, username: args.username, id_role: args.id_role })
  return collaborator
}

const removeCollaborator = async (_, args) => {
  const collaborator = await Collaborator.findOne({ where: { id: args.id_collaborator, id_market: args.id_market, id_organization: args.id_organization } })
  if (!collaborator) throw Error('Error al encontrar el colaborador')
  const user = await User.findOne({ where: { id: collaborator.id } })
  if (!user) throw Error('Error al encontrar el usuario')
  await user.destroy()
  await collaborator.destroy()
  return collaborator
}

module.exports = {
  createCollaborator,
  createRole,
  updateCollaborator,
  removeCollaborator,
}