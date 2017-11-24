import React from 'react';
import {Link} from 'react-router-dom';
import Radium from 'radium';
import DocumentTitle from 'react-document-title';
import styler from 'react-styling';
import {connect} from 'react-redux';
import debounce from 'debounce';
import XDate from 'xdate';

import {fetchChallengesList} from '../../redux/actions';

@Radium
class Home extends React.Component {
  componentWillMount() {
    this.props.getChallengesList();
  }

  render() {
    const {challengesList} = this.props;

    const events = challengesList.map((challenge, i) => {
      const date = new XDate(challenge.date);
      const dueDate = new XDate(challenge.due_date);

      const isLast = i === challengesList.length - 1;
      const isInProgress = new XDate() < dueDate;
      const formattedDate = date.toString('MMM d, yyyy');

      return (
        <li style={styles.eventItem[isLast ? 'last' : 'normal']}
            key={challenge.id}>
          {isInProgress
            ? <div style={styles.eventItemInProgress}>In Progress</div>
            : null
          }
          <p style={styles.eventItemDate}>{formattedDate}</p>
          <Link to={`/challenges/${challenge.id}`}>
            <h2 style={styles.eventItemTitle}>
              {challenge.title}
            </h2>
          </Link>
        </li>
      );
    });

    return (
      <DocumentTitle title={'ml@UBC'}>
        <div style={styles.home}>
          <div style={styles.homeContainer}>
            <h1 style={styles.title}>
              ml @ ubc
            </h1>
            <ul style={styles.eventList}>
              {events}
            </ul>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {challengesList} = state;
  return {
    challengesList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChallengesList: debounce(() => dispatch(fetchChallengesList()), 100),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

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
    width: 700px
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
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-size: 18px
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
