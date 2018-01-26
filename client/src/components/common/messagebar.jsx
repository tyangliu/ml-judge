import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {connect} from 'react-redux';
import debounce from 'debounce';

@Radium
export default class MessageBar extends React.Component {
  render() {
    return (
      <div style={styles.messagebar}>
        <p style={styles.message}>
          Incorrect username or password.
        </p>
      </div>
    );
  }
}

const styles = styler`
  messagebar
    width: 100%
    background: rgba(255, 141, 135, 0.8)
    border-bottom: 1px solid rgba(229, 109, 103, 1)
    //padding: 16px 0
    height: 0
    visibility: hidden
    pointer-events: none
    position: relative

  message
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-weight: bold
    font-size: 18px
    text-align: center
    line-height: 1em
`;
