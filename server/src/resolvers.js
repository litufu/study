const { PubSub,withFilter } = require('apollo-server');
const pubsub = new PubSub();

const channels = [
  {
    id: '1',
    name: 'litufu',
    messages:[{id:'1',text:'first'},{id:'2',text:'second'}]
  },
  {
    id: '2',
    name: 'yinli',
    messages:[{id:'1',text:'meimei'},{id:'2',text:'haohao'}]
  },
];

let nextId = 3;
let nextMessageId = 5;
const resolvers = {
  Query: {
    channels: () => channels,
    channel:(root,args,context,info)=>{
      return channels.find((ch)=>ch.id===args.id)
    }
  },
  Mutation:{
    addChannel:(root,args,context,info)=>{
      const newChannel =  {id:String(nextId++),name:args.name,messages: []}
      channels.push(newChannel)
      return newChannel
    },
    addMessage:(root,args,context,info)=>{
      const newMessage =  {id:String(nextMessageId++),text:args.message.text}
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
