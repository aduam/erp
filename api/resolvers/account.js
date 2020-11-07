const { UserInputError } = require('apollo-server-micro')
const { Paid, Account, ProjectionFee } = require('../database/models')
const moment = require('moment')

const accounts = async () => {
  const getAccounts = await Account.findAll()
  if (getAccounts.length < 1) {
    throw new UserInputError('Hubo un error al buscar las cuentas')
  }
  return getAccounts
}

const account = async (_, { id }) => {
  const getAccount = await Account.findOne({ where: { id } })
  if (!getAccount) {
    throw new UserInputError('Hubo un error al buscar la cuenta')
  }
  return getAccount
}

const accountCreate = async (_, { id_customer, account_info }) => {
  let newAccount
  if (!id_customer || !account_info.term || !account_info.interest || !account_info.amount) {
    throw new UserInputError('Deben venir todos los datos')
  }
  newAccount = await Account.create({ ...account_info, debit: 0, amount: parseFloat(account_info.amount) + (parseFloat(account_info.amount) * (account_info.interest / 100)), id_customer })
  if (!newAccount) {
    throw new UserInputError('Hubo un error al crear la cuenta')
  }

  const amount = account_info.amount / account_info.term
  const now = moment()
  let projectionFees = []
  for (let i = 1; i <= account_info.term; i++) {
    projectionFees.push({
      amount: amount + (amount * (account_info.interest / 100)),
      due_date: new Date(moment(now).add(i, 'M')).getTime(),
      paid: 0,
      id_account: newAccount.id
    })
  }

  await Promise.all(projectionFees.map(async (e) => {
    await ProjectionFee.create({ ...e })
  }))

  return newAccount
}

const paidAccount = async (_, args) => {
  const getAccount = await Account.findOne({ where: { id: args.id_account } })
  if (!getAccount) throw new UserInputError('Cuenta no existe')
  if (args.amount > (parseFloat(getAccount.amount) - parseFloat(getAccount.debit))) {
    throw new UserInputError('El monto es mayor a la deuda')
  }
  const getProjectionFees = await ProjectionFee.findAll({ where: { id_account: getAccount.id }, order: [['due_date', 'DESC']] })
  if (!getProjectionFees) throw new UserInputError('La proyección no existe')
  const paid = Paid.create({ ...args })
  if (!paid) throw new UserInputError('Error al crear pago')
  let amount = args.amount

  await Promise.all(getProjectionFees.map(async (e) => {
    if ((e.paid !== e.amount || !e.paid) && amount > 0) {
      if (amount <= (e.amount - e.paid)) {
        const newAmount = amount
        amount = amount - amount
        if (!e.paid) {
          await ProjectionFee.update({ paid: newAmount }, { where: { id: e.id } })
        } else {
          await ProjectionFee.update({ paid: parseFloat(e.paid) + parseFloat(newAmount) }, { where: { id: e.id } })
        }
      } else {
        amount = amount - (e.amount - e.paid)
        await ProjectionFee.update({ paid: parseFloat(e.paid) + (parseFloat(e.amount) - parseFloat(e.paid)) }, { where: { id: e.id } })
      }
    }
  }))
  const debit = parseFloat(getAccount.debit) + parseFloat(args.amount)
  await getAccount.update({ debit })
  return getAccount
}

module.exports = {
  accounts,
  account,
  accountCreate,
  paidAccount,
}