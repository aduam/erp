const { gql } = require("apollo-server-micro");

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    test: String
  }
`;

module.exports = typeDefs;
