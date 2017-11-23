import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Account extends React.Component {
  onLogout = () => {
    const {user, logout} = this.props;
    logout(user.token);
  };

  render() {
    const {user} = this.props;
    return (
      <div style={styles.account}>
        <button style={styles.logoutButton} onClick={this.onLogout}>
          Sign Out
        </button>
        <div style={styles.accountName}>
          <span style={styles.greeting}>Hi</span>&nbsp;
          <span style={styles.username}>{user.username}</span>!
        </div>
      </div>
    );
  }
}

const styles = styler`
  account
    line-height: 30px

  accountName

  greeting

  username
    font-weight: bold

  logoutButton
    cursor: pointer
    color: rgba(51,88,126,0.89)
    font-family: inherit
    font-size: inherit
    background: none
    border: none
    font-weight: bold
    font-style: italic
    line-height: 30px
    padding-right: 0
    float: right
    outline: none
`;
