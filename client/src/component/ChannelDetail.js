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

export const ChannelDetail = ({ match }) => (
  <Query query={CHANNEL_DETAIL_QUERY} variables={{channelId:match.params.channelId }}>
    {({ loading, error, data }) => {
      console.log(match.params.channelId)
      console.log(data)
      if (loading) return <ChannelPreview channelId={match.params.channelId} />;
      if (error) return `ChannelDetailError!: ${error}`;
      if(data.channel === null){
          return <NotFound />
        }
      return (
        <MessageList messages={data.channel.messages} />
      );
    }}
  </Query>
);
