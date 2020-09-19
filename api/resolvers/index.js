const { test } = require("./test");

const resolvers = {
  Query: {
    test,
  },
};

module.exports = resolvers;
