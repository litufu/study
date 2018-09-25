const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query{
    channels:[Channel]
  }

  type Mutation{
    addChannel(name:String!):Channel
  }

  type Channel{
    id:ID!
    name:String
  }
`

module.exports = typeDefs
