import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

const fbUrl = 'https://www.facebook.com/groups/932716193553951';

@Radium
export default class Footer extends React.Component {
  render() {
    return (
      <div style={styles.footer}>
        <a href={fbUrl} style={styles.fbLink}>
          <div style={styles.fbIcon}/>
          <span style={styles.fbText}>UBC ML Facebook Group</span>
          <div style={styles.clearfix}/>
        </a>
      </div>
    );
  }
}

const styles = styler`
  footer
    display: flex
    align-items: center
    justify-content: center
    padding: 20px 0

  fbIcon
    width: 20px
    height: 20px
    background-image: url(${require('../../images/fb.svg')})
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    display: block
    float: left
    margin-right: 7px

  fbLink
    color: rgba(51,88,126,1)
    font-family: 'mr-eaves-xl-sans', sans-serif;
    font-weight: bold
    display: block
    line-height: 20px

  clearfix
    clear: both
`;
