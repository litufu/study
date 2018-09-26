const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');
const cors = require('cors');

const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const PORT = 4000;

const app = express();
app.use('*', cors({ origin: `http://localhost:3000` }));
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
