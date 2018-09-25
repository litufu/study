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

const resolvers = {
  Query: {
    channels: () => channels,
  },
};

module.exports = resolvers
