import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Home extends React.Component {
  render() {
    return (
      <div style={styles.home}>
        <div style={styles.homeContainer}>
          <h1 style={styles.title}>
            ml @ ubc
          </h1>
          <ul style={styles.eventList}>
            <li style={styles.eventItem.normal}>
              <div style={styles.eventItemInProgress}>
                In Progress
              </div>
              <p style={styles.eventItemDate}>Oct 21, 2017</p>
              <h2 style={styles.eventItemTitle}>
                Titanic Survivors
              </h2>
            </li>
            <li style={styles.eventItem.normal}>
              <p style={styles.eventItemDate}>Sept 21, 2017</p>
              <h2 style={styles.eventItemTitle}>
                Animal Zoo
              </h2>
            </li>
            <li style={styles.eventItem.last}>
              <p style={styles.eventItemDate}>Sept 14, 2017</p>
              <h2 style={styles.eventItemTitle}>
                Food
              </h2>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = styler`
  home
    color: rgba(51,88,126,1)
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh

  homeContainer
    padding: 40px 0

  title
    float: left
    font-weight: bold
    font-size: 36px
    margin-right: 80px
    padding: 20px 40px 20px 0

  eventList
    float: left

  eventItem
    width: 600px
    padding: 14px 20px
    border-top:  1px solid rgba(51,88,126,0.15)

    &normal

    &last
      border-bottom: 1px solid rgba(51,88,126,0.15)

  eventItemDate
    font-size: 11px
    text-transform: uppercase
    letter-spacing: 1px
    margin-bottom: 6px

  eventItemTitle
    font-weight: bold

  eventItemInProgress
    font-size: 11px
    font-family: 'mr-eaves-xl-sans', sans-serif
    line-height: 11px
    padding: 4px 5px
    border-radius: 2px
    margin-top: 4px
    color: rgba(255,255,255,1)
    background: rgba(127,191,63,1)
    float: right

  clearfix
    clear: both
`;
