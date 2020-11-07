import { gql } from '@apollo/client'

export const ACCOUNT_CREATE = gql`
  mutation AccountCreate($id_customer: Int!, $account_info: AccountCreateInput!) {
    accountCreate(id_customer: $id_customer, account_info: $account_info) {
      id
    }
  }
`

export const DO_PAID = gql`
  mutation PaidAccount($id_account: Int!, $amount: Float!) {
    paidAccount(id_account: $id_account, amount: $amount) {
      id
      amount
      debit
      projectionFees {
        id
        amount
        paid
      }
      paids {
        id
        amount
      }
    }
  }
`