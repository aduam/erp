const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    organization(id: Int!): Organization @auth
    me: Me @auth
  }

  type Mutation {
    login(username: String!, password: String!): Me
    createOrganization(organization: OrganizationInput!): Organization
    createMarket(market: MarketInput!): Market
    createCollaborator(collaborator: CollaboratorInput!, id_role: Int!, id_market: Int, username: String!): Collaborator
    createRole(title: String!, description: String): Role
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
    collaborators: [Collaborator]
    create_at: Float
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
    role: Role
    user: User
    token: String
    refresh_token: String
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
`;

module.exports = typeDefs;
