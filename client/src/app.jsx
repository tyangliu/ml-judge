import React from 'react';
import Radium, {Style} from 'radium';
import {Route, Switch} from 'react-router-dom';
import styler from 'react-styling';

import {Home, Challenge, UserBar, MessageBar, Footer, Signup} from './components';

export default class App extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <Style rules={styles.appRules}/>
        <MessageBar/>
        <div style={styles.appContainer}>
          <UserBar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/challenges/:challengeId' component={Challenge}/>
          </Switch>
          {this.props.children}
          <Footer/>
        </div>
      </div>
    );
  }
}

const styles = styler`
  app
    background: rgba(0,0,0,0.03)
    font-family: 'alda', serif
    font-size: 15px
    letter-spacing: 0.4px
    line-height: 1.5em
    color: rgba(51,88,126,1)
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh

  appContainer
    display: flex
    flex-direction: column
    flex: 1
    position: relative

  appRules 
    *
      box-sizing: border-box

    h1
      font-family: 'mr-eaves-xl-sans', sans-serif
    a
      color: inherit
      text-decoration: none
      font-weight: bold

    ::-webkit-input-placeholder
      font-style: italic
      color: rgba(24,50,80,0.5)
`;
