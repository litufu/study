const { PubSub,withFilter } = require('apollo-server');
const faker = require('faker') ;

const pubsub = new PubSub();

const channels = [];
let lastChannelId = 0;
let lastMessageId = 0;
let messageCreatedAt = 123456789;

function addChannel(name) {
  lastChannelId++;
  const newChannel = {
    id: String(lastChannelId),
    name: name,
    messages: [],
  };
  channels.push(newChannel);
  return lastChannelId;
}

function getChannel(id) {
  return channels.find(channel => channel.id === id);
}

function addFakeMessage(channel, messageText) {
  lastMessageId++;
  messageCreatedAt++;
  const newMessage = {
    id: lastMessageId,
    createdAt: String(messageCreatedAt),
    text: messageText,
  };
  channel.messages.push(newMessage);
}

addChannel('faker');
const fakerChannel = channels.find(channel => channel.name === 'faker');

faker.seed(9);
for (let i = 0; i < 50; i++) {
  addFakeMessage(fakerChannel, faker.random.words());
}

addChannel('channel2');

const resolvers = {
  Query: {
    channels: () => channels,
    channel:(root,args,context,info)=>{
      return getChannel(args.id)
    }
  },

  Channel:{
    messageFeed:(root,args,context,info)=>{
      let cursor = args.cursor
      if(!cursor){
        cursor = root.messages[root.messages.length - 1].createdAt
      }
      // cursor = parseInt(cursor);
      const limit = 10;
      const newMessageIndex = root.messages.findIndex(message=>message.createdAt === cursor)
      let newCursor
      if(newMessageIndex>=limit){
        newCursor = root.messages[newMessageIndex - limit].createdAt
      }else{
        newCursor = root.messages[0].createdAt
      }
      const messageFeed = {
        messages:root.messages.slice(newMessageIndex - limit,newMessageIndex),
        cursor:newCursor
      }
      return messageFeed;
    }
  },

  Mutation:{
    addChannel:(root,args,context,info)=>{
      const id =  addChannel(args.name)
      return getChannel(id)
    },
    addMessage:(root,args,context,info)=>{
      const newMessage =  {
        id:String(lastMessageId++),
        text:args.message.text,
        createdAt: String(+new Date()),
      }
      const channel = channels.find((ch)=>ch.id===args.message.channelId)
      if(!channel)
        throw new Error("Channel does not exist");
      channel.messages.push(newMessage)
      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: args.message.channelId });
      return newMessage
    },
  },
  Subscription:{
    messageAdded:{
      subscribe:withFilter(
        ()=>pubsub.asyncIterator('messageAdded'),
        (payload,variables)=>payload.channelId===variables.channelId
      )
    }
  }
};

module.exports = resolvers
