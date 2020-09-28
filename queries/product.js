import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($id_organization: Int!, $id_market: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        products {
          id
          code
          title
          description
          stock
          min_stock
          base_price
          price
          gain
        }
      }
    }
  }
`

export const GET_TYPE_PRODUCTS = gql`
  query GetProducts($id_organization: Int!) {
    organization(id: $id_organization) {
      id
      type_products {
        id
        title
        description
      }
    }
  }
`