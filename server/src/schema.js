const { gql } = require('apollo-server');



const typeDefs = gql`
  type Query{
    channels:[Channel]
    channel(id:ID!):Channel
  }

  type Mutation{
    addChannel(name:String!):Channel
    addMessage(message:MessageInput!):Message
  }

  type Subscription{
    messageAdded(channelId:ID!):Message
  }

  input MessageInput{
    channelId: ID!
    text: String
  }

  type Channel{
    id:ID!
    name:String
    messages:[Message]!
  }

  type Message{
    id:ID!
    text:String
  }
`

module.exports = typeDefs
