import React from 'react';
import {Query} from  'react-apollo'
import gql from 'graphql-tag'

import ChannelPreview from './ChannelPreview'
import MessageList from './MessageList'
import NotFound from './NotFound'

export const CHANNEL_DETAIL_QUERY = gql`
  query Channel($channelId:ID!,$cursor: String){
    channel(id:$channelId){
      id
      name
      messageFeed(cursor:$cursor) @connection(key: "messageFeed"){
        cursor
        messages{
          id
          text
        }
      }
    }
  }
`

const MESSAGE_ADDED = gql`
  subscription MessageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
      createdAt
    }
  }
`;

export const ChannelDetail = ({ match }) => (
  <Query query={CHANNEL_DETAIL_QUERY} variables={{channelId:match.params.channelId }}>
    {({ loading, error, data,subscribeToMore,fetchMore }) => {
      if (loading) return <ChannelPreview channelId={match.params.channelId} />;
      if (error) return `ChannelDetailError!: ${error}`;
      if(data.channel === null){
          return <NotFound />
        }

      return (
        <div>
            <button onClick={()=>{
              return fetchMore({
                variables: {
                  channelId: data.channel.id,
                  cursor: data.channel.messageFeed.cursor,
                },
                updateQuery(previousResult, { fetchMoreResult }){
                  const prevMessageFeed = previousResult.channel.messageFeed;
                  const newMessageFeed = fetchMoreResult.channel.messageFeed;
                  const newChannelData = {...previousResult.channel,
                    messageFeed: {
                      messages: [
                        ...newMessageFeed.messages,
                        ...prevMessageFeed.messages
                      ],
                      cursor: newMessageFeed.cursor,
                      __typename:'MessageFeed'
                    },
                    __typename:'Channel'
                  };
                  const newData =  {...previousResult,channel: newChannelData};
                  return newData;
                },
              })
            }}>
              Load Older Messages
            </button>
          <div className="channelName">
            {data.channel.name}
          </div>
        <MessageList messages={data.channel.messageFeed.messages}
          subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGE_ADDED,
            variables: { channelId: match.params.channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.messageAdded;
              if (!prev.channel.messageFeed.messages.find((msg) =>
                    msg.id === newMessage.id)) {
                  return Object.assign({}, prev, {
                    channel: Object.assign({}, prev.channel, {
                      messageFeed: {
                        messages: [...prev.channel.messageFeed.messages, newMessage],
                        __typename:"MessageFeed"
                      },
                      __typename:"Channel"
                    })
                  });
                } else {
                  return prev;
                }
            }
          })
        }
        />
      </div>
      );
    }}
  </Query>
);
