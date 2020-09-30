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
  query GetProducts($id_organization: Int!, $id_provider: Int!) {
    organization(id: $id_organization) {
      id
      provider(id: $id_provider) {
        id
        name
      }
      type_products {
        id
        title
        description
      }
    }
  }
`

export const GET_PRODUCTS_BY_PROVIDER = gql`
  query GetProductsByProvider($id_organization: Int!, $id_provider: Int!) {
    organization(id: $id_organization) {
      id
      provider(id: $id_provider) {
        id
        name
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

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($id_organization: Int!, $id_market: Int!) {
    products(id_organization: $id_organization, id_market: $id_market) {
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
`