import { gql } from '@apollo/client'

export const GET_SALES = gql`
  query GetSales($id_organization: Int!, $id_market: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        sales {
          id
          customer {
            id
            names
            surnames
            nit
          }
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

export const GET_SALE = gql`
query GetSales($id_organization: Int!, $id_market: Int!, $id_sale: Int!) {
  organization(id: $id_organization) {
    id
    market(id: $id_market) {
      id
      sale(id: $id_sale) {
        id
        customer {
          id
          names
          surnames
          nit
          address
        }
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