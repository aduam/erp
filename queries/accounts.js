import { gql } from '@apollo/client'

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      term
      interest
      amount
      debit
      customer {
        id
        names
        surnames
        nit
        phone
      }
      paids {
        id
        amount
      }
      projectionFees {
        id
        amount
        paid
        due_date
      }
    }
  }
`

export const GET_ACCOUNT = gql`
  query GetAccount($id: Int!) {
    account(id: $id) {
      id
      term
      interest
      amount
      debit
      customer {
        id
        names
        surnames
        nit
        phone
      }
      paids {
        id
        amount
      }
      projectionFees {
        id
        amount
        paid
        due_date
      }
    }
  }
`