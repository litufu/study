import React from 'react';
import AddMessage from './AddMessage'

class MessageList extends React.Component{
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }

  render(){
    const messages = this.props.messages
    return(
      <div className="messagesList">
      { messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.text}
        </div>)
      )}
      <AddMessage />
    </div>);
  }
}
export default (MessageList);
