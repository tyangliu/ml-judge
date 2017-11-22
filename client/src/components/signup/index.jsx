import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Signup extends React.Component {
  render() {
    return (
      <div style={styles.signup}>
      </div>
    );
  }
}

const styles = styler`
  signup
    color: rgba(51,88,126,1)
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh
    
`;
