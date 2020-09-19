import { ApolloServer } from 'apollo-server-micro'
const typeDefs = require('../../api/schema')
const resolvers = require('../../api/resolvers')
const context = require('../../api/context')
const schemaDirectives = require('../../api/directives')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler