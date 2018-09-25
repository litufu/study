import React from 'react';
import {Mutation} from  'react-apollo'
import gql from 'graphql-tag'
import {CHANNEL_LIST_QUEYR} from './ChannelList'


const ADD_CHANNEL = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`

class AddChannel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:""
    }
  }

  render(){
    const {name} = this.state
    return(
      <Mutation
          mutation={ADD_CHANNEL}
          update={(cache, { data:{addChannel} }) => {
              const { channels } = cache.readQuery({ query: CHANNEL_LIST_QUEYR });
              cache.writeQuery({
                query: CHANNEL_LIST_QUEYR,
                data: { channels: channels.concat([addChannel]) }
              });
            }}
        >
          {
            (addChannel,{data})=>{
              return(
                <form
                  onSubmit={
                    e=>{
                      e.preventDefault();
                      addChannel({ variables: { name } })
                      this.setState({name:""})
                    }
                  }
                  >
                    <input
                      type='text'
                      placeholder='name'
                      onChange={e=>this.setState({name:e.target.value})}
                      value={name}
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

export default AddChannel
