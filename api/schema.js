const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    organization(id: Int!): Organization @auth
    products(id_market: Int!, id_organization: Int!): [Product] @auth
    me: Me @auth
    #Report
    reports: Report @auth
    #Accounts
    accounts: [Account] @auth
    account(id: Int!): Account @auth
    #Searching
    searchCustomer(nit: String!): Customer @auth
  }

  type Mutation {
    login(username: String!, password: String!): Me
    loginV2(username: String!, password: String!): Me

    #Organization
    createOrganization(organization: OrganizationInput!): Organization

    #Market
    createMarket(market: MarketInput!, id_organization: Int!): Market

    #Collaborator
    createCollaborator(collaborator: CollaboratorInput!, id_role: Int!, id_market: Int, username: String!, id_organization: Int!): Collaborator
    updateCollaborator(collaborator: CollaboratorInput, id_collaborator: Int!, id_role: Int!, id_market: Int, username: String!, id_organization: Int!): Collaborator @auth
    removeCollaborator(id_market: Int!, id_organization: Int!, id_collaborator: Int!): Collaborator @auth
    resetMePassword(password: String!): Collaborator @auth
    resetPassword(id_collaborator: Int!): Collaborator @auth

    #Role
    createRole(title: String!, description: String): Role

    #Provider
    createProvider(provider: ProviderInput!, id_market: Int!, id_organization: Int!): Provider @auth
    editProvider(provider: ProviderEditInput, id_provider: Int!, id_organization: Int!): Provider @auth
    removeProvider(id: Int!): Provider @auth

    #Products
    createTypeProduct(title: String!, description: String, id_organization: Int!): TypeProduct @auth
    createProduct(product: ProductCreateInput!, id_type_product: Int!, id_organization: Int!, id_market: Int!): Product @auth
    updateProduct(product: ProductUpdateInput, id_product: Int!, id_type_product: Int!, id_organization: Int!, id_market: Int!): Product @auth
    removeProduct(id: Int!): Product @auth
    updateStock(amount: Int!, id_product: Int!, id_provider: Int!, id_organization: Int!, id_market: Int!): Product @auth

    #Shoppings
    shopingCreate(id_market: Int!, id_status: Int!, recipe: String! products: [ProductsShoppingCreateInput!]!): Shopping @auth
    shopingCancel(id_shopping: Int!, id_market: Int!): Shopping @auth

    #Sales
    saleCreate(id_market: Int!, id_status: Int!, products:[ProductsShoppingCreateInput!]! id_customer: Int): Sale @auth
    saleCancel(id_sale: Int!, id_market: Int!): Sale @auth

    #Customer
    customerCreate(customer: CustomerInput!): Customer @auth
    customerUpdate(customer: CustomerUpdateInput, id_customer: Int!): Customer @auth
    customerRemove(id_customer: Int!): Customer @auth

    #Account
    accountCreate(id_customer: Int!, account_info: AccountCreateInput!): Account @auth

    #Paid
    paidAccount(id_account: Int!, amount: Float!): Account @auth
  }

  type Paids {
    id: Int
    amount: Float
  }

  type ProjectionFees {
    id: Int
    amount: Float
    due_date: Float
    paid: Float
  }

  type Account {
    id: Int
    term: Float
    interest: Float
    customer: Customer
    amount: Float
    debit: Float
    projectionFees: [ProjectionFees]
    paids: [Paids]
  }

  type Customer {
    id: Int
    names: String
    surnames: String
    nit: String
    phone: String
    photo_profile: String
    address: String
  }

  type ReportSale {
    title: String
    categories: [String!]
    series: [Int!]
  }

  type ReportShop {
    title: String
    categories: [String!]
    series: [Int!]
  }

  type Report {
    sale: ReportSale
    shop: ReportShop
  }

  type Status {
    id: Int
    title: String
  }

  type Sale {
    id: Int
    products: [Product]
    status: Status
    customer: Customer
  }

  type Shopping {
    id: Int
    recipe: String
    products: [Product]
    status: Status
  }

  type Organization {
    id: Int
    name: String
    business_name: String
    social_reason: String
    nit: String
    address: String
    phone: String
    mobile: String
    photo: String
    create_at: Float
    markets: [Market]
    market(id: Int!): Market
    providers: [Provider]
    provider(id: Int!): Provider
    type_products: [TypeProduct]
    customer(id: Int!): Customer
    customers: [Customer]
  }

  type Market {
    id: Int
    name: String
    business_name: String
    social_reason: String
    nit: String
    address: String
    phone: String
    mobile: String
    photo: String
    collaborators: [Collaborator]
    collaborator(id: Int!): Collaborator
    products: [Product]
    product(id: Int!): Product
    id_organization: Int
    create_at: Float
    shoppings: [Shopping]
    shopping(id: Int!): Shopping
    sales: [Sale]
    sale(id: Int!): Sale
  }

  type Product {
    id: Int
    code: String
    title: String
    description: String
    stock: Int
    min_stock: Int
    amount: Int
    price: String
    type_product: TypeProduct
  }

  type Role {
    id: Int
    title: String
    description: String
  }

  type User {
    id: Int
    username: String
  }

  type TypeProduct {
    id: Int
    title: String
    description: String
  }

  type Collaborator {
    id: Int
    names: String
    surnames: String
    identification: String
    photo_profile: String
    active: Boolean
    role: Role
    user: User
  }

  type Me {
    id: Int
    names: String
    surnames: String
    identification: String
    photo_profile: String
    active: Boolean
    id_market: Int
    id_organization: Int
    role: Role
    user: User
    market: Market
    token: String
    refresh_token: String
  }

  type Provider {
    id: Int
    name: String
    description: String
    business_name: String
    social_reason: String
    nit: String
    address: String
    phone: String
    mobile: String
    photo: String
    products: [Product]
  }

  input OrganizationInput {
    name: String!
    business_name: String!
    social_reason: String!
    nit: String!
    address: String!
    phone: String!
    mobile: String!
    photo: String
  }

  input MarketInput {
    name: String!
    business_name: String
    social_reason: String
    nit: String
    address: String!
    phone: String!
    mobile: String!
    photo: String
  }

  input CollaboratorInput {
    names: String!
    surnames: String!
    identification: String!
    photo_profile: String
  }

  input CustomerInput {
    names: String!
    surnames: String!
    nit: String!
    address: String!
    phone: String
  }

  input CustomerUpdateInput {
    names: String
    surnames: String
    nit: String
    address: String
    phone: String
  }

  input ProviderInput {
    name: String!
    description: String
    business_name: String
    social_reason: String
    nit: String
    address: String
    phone: String
    mobile: String
    photo: String
  }

  input ProviderEditInput {
    name: String!
    description: String
    business_name: String
    social_reason: String
    nit: String
    address: String
    phone: String
    mobile: String
    photo: String
  }

  input ProductCreateInput {
    code: String
    title: String!
    stock: Int!
    description: String
    min_stock: Int!
  }

  input ProductUpdateInput {
    code: String
    title: String
    description: String
    min_stock: Int
  }

  input ProductsShoppingCreateInput {
    amount: Int!
    price: Float!
    id_product: Int!
  }

  input AccountCreateInput {
    term: Float!
    interest: Float!
    amount: Float!
  }
`

module.exports = typeDefs
