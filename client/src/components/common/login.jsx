import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Login extends React.Component {
  render() {
    return (
      <div style={styles.login}>
        <button style={[styles.loginSignup, styles.loginButton]}>
          Create Account
        </button>
        <form style={styles.loginForm}>
          <input style={styles.loginInput} type='text' name='username' placeholder='Username'/>
          <input style={styles.loginInput} type='password' name='password' placeholder='Password'/>
          <input style={styles.loginButton} type='button' value='Sign In'/>
        </form>
      </div>
    );
  }
}

const styles = styler`
  loginInput
    font-size: inherit
    color: inherit
    font-family: inherit
    background: none
    border: none
    margin-right: 24px
    outline: none
    line-height: 30px
    width: 180px

  loginButton
    cursor: pointer
    color: rgba(51,88,126,0.89)
    font-family: inherit
    font-size: inherit
    background: none
    border: none
    font-weight: bold
    font-style: italic
    line-height: 30px
    outline: none

  loginSignup
    float: right
    padding-right: 0
`;