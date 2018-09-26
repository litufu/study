import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'

import {ChannelList} from './ChannelList'
import {ChannelDetail} from './ChannelDetail'
import NotFound from './NotFound'
import logo from '../assets/apollo-logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Apollo</h1>
        </header>
        <Switch>
          <Route exact path="/" component={ChannelList}/>
          <Route path="/channel/:channelId" component={ChannelDetail}/>
          <Route component={ NotFound }/>
        </Switch>
      </div>
    );
  }
}

export default App;
