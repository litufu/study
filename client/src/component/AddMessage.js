import React from 'react';
import {Mutation} from  'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router';

import {CHANNEL_DETAIL_QUERY} from './ChannelDetail'


const ADD_Message = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`

class AddMessage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:""
    }
  }

  render(){
    const {text} = this.state
    return(
      <Mutation
          mutation={ADD_Message}
          // update={(cache, { data:{addMessage} }) => {
          //     const data = cache.readQuery({
          //       query: CHANNEL_DETAIL_QUERY,
          //       variables: {
          //         channelId: this.props.match.params.channelId,
          //       },
          //      });
          //      data.channel.messages.push(addMessage)
          //     cache.writeQuery({
          //       query: CHANNEL_DETAIL_QUERY,
          //       variables: {
          //         channelId: this.props.match.params.channelId,
          //       },
          //       data:data
          //     });
          //   }}
        >
          {
            (addMessage,{data})=>{
              return(
                <form
                  onSubmit={
                    e=>{
                      e.preventDefault();
                      console.log(this.props)
                      addMessage(
                        { variables: {message: {text:text, channelId:this.props.match.params.channelId} },}
                      )
                      this.setState({text:""})
                    }
                  }
                  >
                    <input
                      type='text'
                      placeholder='name'
                      onChange={e=>this.setState({text:e.target.value})}
                      value={text}
                     />
                      <input type='submit' />
                </form>
              )
            }
          }
        </Mutation>
    )
  }

}

export default withRouter(AddMessage)
