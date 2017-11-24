import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {Link} from 'react-router-dom';

@Radium
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  onSubmit = () => {
    const {login} = this.props;
    const {username, password} = this.state;
    if (username == '' || password == '') {
      return;
    }
    login(username, password);
  };

  render() {
    return (
      <div style={styles.login}>
        <Link to='/signup'>
          <button style={[styles.loginSignup, styles.loginButton]}>
            Create Account
          </button>
        </Link>
        <Link to='/' style={styles.homeLink}>
          <i className='material-icons' style={styles.homeIcon}>home</i>
        </Link>
        <form style={styles.loginForm}>
          <input
            style={styles.loginInput}
            type='text'
            name='username'
            placeholder='Username'
            onChange={event => this.setState({username: event.target.value})}
          />
          <input
            style={styles.loginInput}
            type='password'
            name='password'
            placeholder='Password'
            onChange={event => this.setState({password: event.target.value})}
          />
          <input
            style={styles.loginButton}
            type='button' value='Sign In'
            onClick={this.onSubmit}
          />
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

  homeLink
    margin-right: 40px
    line-height: 1px
    float: left
    margin-top: 4px
  
  homeIcon
    font-size: 22px
`;
