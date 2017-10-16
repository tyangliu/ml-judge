import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {Switch, Route, Link} from 'react-router-dom';

import ChallengeNavigation from './navigation';
import ChallengeInfo from './info';
import Leaderboard from './leaderboard';
import Submissions from './submissions';

@Radium
export default class Challenge extends React.Component {
  render() {
    console.log(this.props.routes);
    return (
      <div style={styles.challenge}>
        <div style={styles.challengeContainer}>
          <div style={styles.challengeHeader}>
            <p style={styles.challengeDeadline}>
              <span style={styles.submitBy}>Submit By:</span> Oct 28, 2017 9:00PM
            </p>
            <p style={styles.challengeDate}>Oct 21, 2017</p>
            <h1 style={styles.title}>
              Titanic Survivors
            </h1>
          </div>
          <Route component={ChallengeNavigation}/>
					<div style={styles.body}>
            <Switch>
              <Route exact path='/challenge' component={ChallengeInfo}/>
              <Route path='/challenge/leaderboard' component={Leaderboard}/>
              <Route path='/challenge/submissions' component={Submissions}/>
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
    padding: 80px 0

  challengeDate
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    margin-bottom: 12px

  title
    font-weight: bold
    font-size: 36px
    margin-bottom: 36px 

  challengeDeadline 
    font-size: 14px
    text-transform: uppercase
    margin-bottom: 12px
    float: right

  submitBy
    text-transform: none
    font-style: italic

  description
    width: 640px
    margin: 0 auto

  clearfix
    clear: both
`;
