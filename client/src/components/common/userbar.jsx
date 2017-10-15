import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

import Login from './login';
import Account from './account';

@Radium
export default class UserBar extends React.Component {
  render() {
    const isLoggedIn = false;
    return (
      <div style={styles.userbar}>
        {isLoggedIn ? <Account/> : <Login/>}
      </div>
    );
  }
}

const styles = styler`
  userbar
    padding: 10px 0
    position: absolute
    top: 0
    width: 100%
    max-width: 960px
    margin: 0 auto
    border-bottom: 1px solid rgba(51,88,126,0.2)
`;
