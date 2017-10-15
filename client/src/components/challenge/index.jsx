import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {Switch, Route} from 'react-router';

import ChallengeInfo from './info';
import Leaderboard from './leaderboard';

@Radium
export default class Challenge extends React.Component {
  render() {
    return (
      <div style={styles.challenge}>
        <div style={styles.challengeContainer}>
          <div style={styles.challengeHeader}>
            <p style={styles.challengeDate}>Oct 21, 2017</p>
            <h1 style={styles.title}>
              Meme
            </h1>
          </div>
          <div style={styles.challengeNavContainer}>
            <ul style={styles.challengeNav}>
              <li style={styles.navItem.current}>
                Challenge
              </li>
              <li style={styles.navItem}>
                Resources
              </li>
              <li style={styles.navItem}>
                Submissions
              </li>
              <li style={styles.navItem}>
                Leaderboard
              </li>
            </ul>
            <div style={styles.clearfix}/>
          </div>
					<div style={styles.body}>
            <Switch>
              <Route path='/' component={ChallengeInfo}/>
              <Route path='/leaderboard' component={Leaderboard}/>
            </Switch>
					</div>
        </div>
      </div>
    );
  }
}

const styles = styler`
  challenge
    color: rgba(51,88,126,1)
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh

  challengeContainer
    width: 960px
    padding: 40px 0

  challengeDate
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    margin-bottom: 12px

  title
    font-weight: bold
    font-size: 36px
    margin-bottom: 36px

  challengeNavContainer
    border-bottom: 1px solid rgba(51,88,126,0.2)
    margin-bottom: 36px

  challengeNav
    font-family: 'mr-eaves-xl-sans', sans-serif
    float: right

  navItem
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: bold
    padding: 12px 18px 8px 18px
    float: left

    &.current
      border-bottom: 4px solid rgba(1, 88, 126, 0.2)
      

  description
    width: 640px
    margin: 0 auto

  clearfix
    clear: both
`;
