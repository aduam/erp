const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    organization(id: Int!): Organization
  }

  type Mutation {
    createOrganization(organization: OrganizationInput!): Organization
    createMarket(market: MarketInput!): Market
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
    create_at: Float
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
`;

module.exports = typeDefs;
