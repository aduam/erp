const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    organization(id: Int!): Organization @auth
    me: Me @auth
  }

  type Mutation {
    login(username: String!, password: String!): Me

    #Organization
    createOrganization(organization: OrganizationInput!): Organization

    #Market
    createMarket(market: MarketInput!, id_organization: Int!): Market @auth

    #Collaborator
    createCollaborator(collaborator: CollaboratorInput!, id_role: Int!, id_market: Int, username: String!, id_organization: Int!): Collaborator

    #Role
    createRole(title: String!, description: String): Role

    #Provider
    createProvider(provider: ProviderInput!, id_market: Int!, id_organization: Int!): Provider @auth
    editProvider(provider: ProviderEditInput, id_provider: Int!, id_organization: Int!): Provider @auth
    removeProvider(id: Int!): Provider @auth

    #Products
    createTypeProduct(title: String!, description: String, id_organization: Int!): TypeProduct @auth
    createProduct(product: ProductCreateInput!, id_type_product: Int!, id_provider: Int!, id_organization: Int!, id_market: Int!): Product @auth
    updateStock(amount: Int!, id_product: Int!, id_provider: Int!, id_organization: Int!, id_market: Int!): Product @auth
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
    products: [Product]
    product(id: Int!): Product
    id_organization: Int
    create_at: Float
  }

  type Product {
    id: Int
    code: String
    title: String
    description: String
    stock: Int
    min_stock: Int
    base_price: Float
    price: Float
    gain: Float
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
    description: String
    stock: Int!
    min_stock: Int!
    base_price: Float!
    price: Float
    gain: Float
  }
`;

module.exports = typeDefs;
