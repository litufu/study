import React from 'react';
import {Query} from  'react-apollo'
import gql from 'graphql-tag'

import ChannelPreview from './ChannelPreview'
import MessageList from './MessageList'
import NotFound from './NotFound'

export const CHANNEL_DETAIL_QUERY = gql`
  query Channel($channelId:ID!){
    channel(id:$channelId){
      id
      name
      messages{
        id
        text
      }
    }
  }
`

const MESSAGE_ADDED = gql`
  subscription MessageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`;

export const ChannelDetail = ({ match }) => (
  <Query query={CHANNEL_DETAIL_QUERY} variables={{channelId:match.params.channelId }}>
    {({ loading, error, data,subscribeToMore }) => {
      if (loading) return <ChannelPreview channelId={match.params.channelId} />;
      if (error) return `ChannelDetailError!: ${error}`;
      if(data.channel === null){
          return <NotFound />
        }
      return (
        <MessageList messages={data.channel.messages}
          subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGE_ADDED,
            variables: { channelId: match.params.channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.messageAdded;
              const result = Object.assign({}, prev, {
                channel: {
                  id:prev.channel.id,
                  name:prev.channel.name,
                  messages: [...prev.channel.messages,newMessage],
                  __typename: "Channel"
                }
              });
              return result
            }
          })
        }
        />
      );
    }}
  </Query>
);
