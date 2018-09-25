import React from 'react';
import {Query} from  'react-apollo'
import gql from 'graphql-tag'


const CHANNEL_LIST_QUEYR = gql `
  {
    channels{
      id
      name
    }
  }
`

export const ChannelList = () =>{
  return (
    <Query query={CHANNEL_LIST_QUEYR}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error:{error.message}</div>

          const channels = data.channels

          return (
            <div>
              {channels.map(ch => <div key={ch.id} >{ch.name}</div>)}
            </div>
          )
        }}
    </Query>

  )
}
