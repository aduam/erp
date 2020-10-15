import { gql } from '@apollo/client'

export const GET_SHOPPINGS = gql`
  query GetShoppings($id_organization: Int!, $id_market: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        shoppings {
          id
          recipe
          status {
            id
            title
          }
          products {
            id
            code
            title
            description
            stock
            min_stock
          }
        }
      }
    }
  }
`

export const GET_SHOPPING = gql`
  query GetShopping($id_organization: Int!, $id_market: Int!, $id_shopping: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        shopping(id: $id_shopping) {
          id
          recipe
          status {
            id
            title
          }
          products {
            id
            code
            title
            description
            stock
            min_stock
            price
            amount
          }
        }
      }
    }
  }
`