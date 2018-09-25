const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
