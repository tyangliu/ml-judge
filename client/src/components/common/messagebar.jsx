import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {connect} from 'react-redux';
import debounce from 'debounce';

@Radium
class MessageBar extends React.Component {
  render() {
    const {ui} = this.props;
    const hasMessage = ui.message && ui.message.length > 0;

    return (
      <div style={styles.messagebar[hasMessage ? 'visible' : 'normal']}>
        <p style={styles.message}>
          {ui.message}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ui} = state;
  return {
    ui,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageBar);

const styles = styler`
  messagebar
    width: 100%
    background: rgba(255, 141, 135, 0.8)
    border-bottom: 1px solid rgba(229, 109, 103, 1)
    padding: 16px 0
    position: relative

    &normal
      display: none

    &visible
      display: block

  message
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-weight: bold
    font-size: 18px
    text-align: center
    line-height: 1em
    margin: 0
`;
