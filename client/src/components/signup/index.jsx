import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import debounce from 'debounce';

import {fetchSignup} from '../../redux/actions';

@Radium
class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onSubmit = () => {
    const {signup} = this.props;
    const {username, email, password} = this.state;
    if (username == '' || email == '' || password == '') {
      return;
    }
    signup(username, email, password);
  };

  render() {
    return (
      <DocumentTitle title={'Create Account - ml@UBC'}>
        <div style={styles.signup}>
          <div style={styles.signupContainer}>
            <h1 style={styles.title}>
              Create Account
            </h1>
            <form style={styles.signupForm}> 
              <input
                style={styles.signupInput}
                type='text'
                name='username'
                placeholder='Username'
                onChange={event => this.setState({username: event.target.value})}
              /> 
              <input
                style={styles.signupInput}
                type='text'
                name='email'
                placeholder='Email'
                onChange={event => this.setState({email: event.target.value})}
              />
              <input
                style={styles.signupInput}
                type='password'
                name='password'
                placeholder='Password'
                onChange={event => this.setState({password: event.target.value})}
              /> 
              <input
                style={styles.signupButton}
                type='button' value='Sign Up'
                onClick={this.onSubmit}
              />
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: debounce((username, email, password) => dispatch(fetchSignup(username, email, password)), 100),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

const styles = styler`
  signup
    color: rgba(51,88,126,1)
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh

  signupContainer
    padding: 40px 0
    
  title
    float: left
    font-weight: bold
    font-size: 36px
    margin-right: 80px
    padding: 20px 40px 20px 0

  signupForm
    float: left

  signupInput
    display: block
    font-size: inherit
    color: inherit
    font-family: inherit
    background: none
    margin-right: 24px
    margin-bottom: 16px
    outline: none
    line-height: 30px
    width: 300px
    border-top: none
    border-left: none
    border-right: none
    border-bottom: 1px solid rgba(51,88,126,0.2)

  signupButton
    display: block
    outline: none
    border: none
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-size: inherit
    font-weight: bold
    text-transform: uppercase
    letter-spacing: 1px
    color: rgba(255,255,255,1)
    background: rgba(51,88,126,1)
    padding: 9px 14px
    margin-top: 30px
    border-radius: 2px
`;
