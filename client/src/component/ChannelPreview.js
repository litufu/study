import React from 'react';
import {Query} from  'react-apollo'
import gql from 'graphql-tag'


const CHANNEL_PREVIEW = gql`
  query ChannelPreview($id:ID){
    channel(id:$id){
      id
      name
    }
  }
`

export default class ChannelPreview extends React.Component{
  render(){
    return(
      <Query query={CHANNEL_PREVIEW} variables={{ id:this.props.channelId }}>
       {({ loading, error, data }) => {
         if (loading) return "Loading ChannelPreview...";
         if (error) return `Error! ${error.message}`;
         return (
           <div>
             <div className="channelName">
               {data.name}
             </div>
             <div>Loading Messages</div>
           </div>
         );
       }}
     </Query>
    );
  }
}
