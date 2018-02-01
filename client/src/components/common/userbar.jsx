import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {connect} from 'react-redux';
import debounce from 'debounce';

import Login from './login';
import Account from './account';

import {
  fetchLogin,
  fetchLogout,
  retrieveToken,
} from '../../redux/actions';

@Radium
class UserBar extends React.Component {
  componentWillMount() {
    this.props.getToken();
  }

  render() {
    const {user, login, logout} = this.props;
    const isLoggedIn = user != null;
    return (
      <div style={styles.userbar}>
        {isLoggedIn
          ? <Account user={user} logout={logout}/>
          : <Login login={login}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {user} = state;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getToken: debounce(() => dispatch(retrieveToken()), 100),
    login: debounce((username, password) => dispatch(fetchLogin(username, password)), 100),
    logout: debounce(token => dispatch(fetchLogout(token)), 100),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBar);

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
