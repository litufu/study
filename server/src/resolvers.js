const channels = [
  {
    id: '1',
    name: 'litufu',
  },
  {
    id: '2',
    name: 'yinli',
  },
];

let nextId = 3;
const resolvers = {
  Query: {
    channels: () => channels,
  },
  Mutation:{
    addChannel:(root,args,context,info)=>{
      const newChannel =  {id:nextId++,name:args.name}
      channels.push(newChannel)
      return newChannel
    }
  }
};

module.exports = resolvers
