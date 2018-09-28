import React from 'react';
import {Query} from  'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

import AddChannel from './AddChannel'

export const CHANNEL_LIST_QUEYR = gql `
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
        console.log(data)
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error:{error.message}</div>
          const channels = data.channels
          return (
            <div>
              <AddChannel />
              {channels.map(ch => <div key={ch.id} >
                  <Link to={ `channel/${ch.id}`}>
                    {ch.name}
                  </Link>
                </div>
              )}
            </div>
          )
        }}
    </Query>

  )
}
