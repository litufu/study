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
    # messages will be returned in a MessageFeed object wrapper
    messageFeed(cursor: String): MessageFeed
  }

  type Message{
    id:ID!
    text:String
    createdAt: String
  }

  type MessageFeed {
  # cursor specifies the place in the list where we left off
  cursor: String!
  # this is a chunk of messages to be returned
  messages: [Message]!
 }
`

module.exports = typeDefs
