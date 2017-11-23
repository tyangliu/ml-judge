import React from 'react';
import Radium, {Style} from 'radium';
import styler from 'react-styling';
import {Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import debounce from 'debounce';
import XDate from 'xdate';

import {fetchChallenge} from '../../redux/actions';

import ChallengeNavigation from './navigation';
import ChallengeInfo from './info';
import Leaderboard from './leaderboard';
import Submissions from './submissions';

@Radium
class Challenge extends React.Component {
  componentWillMount() {
    const {match: {params}, getChallenge} = this.props;
    getChallenge(params.challengeId);
  }

  render() {
    const {challenges, match: {params}} = this.props;
    const challenge = challenges[params.challengeId];

    if (challenge == null) {
      return <div/>;
    }

    const basePath = `/challenges/${params.challengeId}`;
    const date = new XDate(challenge.date);
    const dueDate = new XDate(challenge.due_date);
    const formattedDate = date.toString('MMM d, yyyy');
    const formattedDueDate = dueDate.toString('MMM d, yyyy h:mm TT');

    return (
      <div style={styles.challenge}>
        <Style rules={styles.challengeRules}/>
        <div style={styles.challengeContainer}>
          <div style={styles.challengeHeader}>
            <p style={styles.challengeDeadline}>
              <span style={styles.submitBy}>Submit By:</span> {formattedDueDate}
            </p>
            <p style={styles.challengeDate}>{formattedDate}</p>
            <h1 style={styles.title}>
              {challenge.title}
            </h1>
          </div>
          <Route component={ChallengeNavigation}/>
					<div style={styles.body}>
            <Switch>
              <Route exact path={basePath} render={() => <ChallengeInfo challenge={challenge}/>}/>
              <Route path={`${basePath}/leaderboard`} render={() => <Leaderboard challenge={challenge}/>}/>
              <Route path={`${basePath}/submissions`} render={() => <Submissions challenge={challenge}/>}/>
            </Switch>
					</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {challenges} = state;
  return {
    challenges,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChallenge: debounce(challengeId => dispatch(fetchChallenge(challengeId)), 100),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Challenge);

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

  challengeRules
    h1
      font-family: 'mr-eaves-xl-sans', sans-serif
      font-weight: bold
      font-size: 22px
      line-height: 36px
      margin-bottom: 4px

    p
      margin-bottom: 26px
`;
