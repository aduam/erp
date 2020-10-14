import { gql } from '@apollo/client'

export const CREATE_TYPE_PRODUCT = gql`
  mutation CreateTypeProduct($title: String!, $description: String, $id_organization: Int!) {
    createTypeProduct(title: $title, description: $description, id_organization: $id_organization) {
      id
      title
      description
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $product: ProductCreateInput!
    $id_type_product: Int!
    $id_market: Int!
    $id_organization: Int!
  ) {
    createProduct(
      product: $product
      id_type_product: $id_type_product
      id_market: $id_market
      id_organization: $id_organization
    ) {
      id
      code
      title
      description
      stock
      min_stock
    }
  }
`

export const UPDATE_ADD_PRODUCT = gql`
  mutation UpdateAddProduct($amount: Int!, $id_product: Int!, $id_provider: Int!, $id_organization: Int!, $id_market: Int!) {
    updateStock(amount: $amount, id_product: $id_product, id_provider: $id_provider, id_organization: $id_organization, id_market: $id_market) {
      id
      code
      title
      description
      stock
      min_stock
    }
  }
`

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`