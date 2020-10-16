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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $product: ProductUpdateInput!
    $id_type_product: Int!
    $id_market: Int!
    $id_organization: Int!
    $id_product: Int!
  ) {
    updateProduct(
      product: $product
      id_type_product: $id_type_product
      id_market: $id_market
      id_organization: $id_organization
      id_product: $id_product
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

export const SHOPPING_CREATE = gql`
  mutation ShoppingCreate($id_market: Int!, $id_status: Int!, $recipe: String! $products: [ProductsShoppingCreateInput!]!) {
    shopingCreate(id_market: $id_market, id_status: $id_status, products: $products, recipe: $recipe) {
      id
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
`

export const SHOPPING_CANCEL = gql`
  mutation ShoppingCancel($id_shopping: Int!, $id_market: Int!) {
    shopingCancel(id_shopping: $id_shopping, id_market: $id_market) {
      id
      recipe
      status {
        id
        title
      }
    }
  }
`

export const SALE_CREATE = gql`
  mutation SaleCreate($id_market: Int!, $id_status: Int!, $products: [ProductsShoppingCreateInput!]!) {
    saleCreate(id_market: $id_market, id_status: $id_status, products: $products) {
      id
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
`

export const SALE_CANCEL = gql`
  mutation SaleCancel($id_sale: Int!, $id_market: Int!) {
    saleCancel(id_sale: $id_sale, id_market: $id_market) {
      id
      status {
        id
        title
      }
    }
  }
`