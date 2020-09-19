const { SchemaDirectiveVisitor, AuthenticationError, ApolloError } = require('apollo-server-micro');
const { defaultFieldResolver } = require('graphql');

class Auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const ctx = args[2]
      if (!ctx.token) throw new AuthenticationError('No has iniciado sesión')
      if (!ctx.payload) throw new ApolloError('no ha payload', '200')
      return resolve.apply(this, args);
    };
  }
}

module.exports = { auth: Auth }