import { gql } from '@apollo/client'

export const GET_CUSTOMERS = gql`
  query GetCustomers($id_organization: Int!) {
    organization(id: $id_organization) {
      id
      customers {
        id
        names
        surnames
        nit
        address
        phone
      }
    }
  }
`

export const GET_CUSTOMER = gql`
  query GetCustomers($id_organization: Int!, $id_customer: Int!) {
    organization(id: $id_organization) {
      id
      customer(id: $id_customer) {
        id
        names
        surnames
        nit
        address
        phone
      }
    }
  }
`

export const SEARCH_CUSTOMER = gql`
  query SearchCustomer($nit: String!) {
    searchCustomer(nit: $nit) {
      id
      names
      surnames
      nit
      address
    }
  }
`