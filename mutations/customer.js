import { gql } from '@apollo/client'

export const CUSTOMER_CREATE = gql`
  mutation CustomerCreate($customer: CustomerInput!) {
    customerCreate(customer: $customer) {
      id
    }
  }
`

export const CUSTOMER_UPDATE = gql`
  mutation CustomerUpdate($customer: CustomerUpdateInput!, $id_customer: Int!) {
    customerUpdate(customer: $customer, id_customer: $id_customer) {
      id
    }
  }
`

export const CUSTOMER_REMOVE = gql`
  mutation CustomerRemove($id_customer: Int!) {
    customerRemove(id_customer: $id_customer) {
      id
    }
  }
`