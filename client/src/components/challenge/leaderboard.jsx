import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import XDate from 'xdate';

@Radium
export default class Leaderboard extends React.Component {
  componentWillMount() {
    const {challenge, getLeaderboard} = this.props;
    getLeaderboard(challenge.id); 
  }

  render() {
    const {leaderboard, user} = this.props;
    const subRows = leaderboard.map((sub, i) => {
      const isCurrentUser = user && user.username == sub.username;
      return ( 
        <tr style={styles.entryItem[isCurrentUser ? 'current' : 'normal']}
            key={sub.sub_id}>
          <td style={styles.entryRank}>
            {i + 1}
          </td>
          <td style={styles.entryName}>
            {sub.username}
          </td>
          <td style={styles.entryScore}>
            {sub.score}
          </td>
          <td style={styles.entryDatetime}>
            {(new XDate(sub.created_at)).toString('M/d/yyyy h:mm TT')}
          </td>
        </tr>
      );
    });
    return (
      <div style={styles.leaderboard}>
        <table style={styles.entries}>
          <tbody>
            <tr style={styles.entriesHeader}>
              <th style={styles.entriesHeaderRank}>
                Rank
              </th>
              <th style={styles.entriesHeaderName}> 
                Team
              </th>
              <th style={styles.entriesHeaderScore}>
                Score
              </th>
              <th style={styles.entriesHeaderDatetime}>
                Submitted
              </th>
            </tr>
            {subRows}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = styler`
  leaderboard
    width: 100%

  entries
    width: 100%

  entriesHeader
    text-align: left
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-weight: bold
    text-transform: uppercase
    letter-spacing: 1px
    border-bottom: 1px solid rgba(51,88,126,0.2)

  entriesHeaderRank
    width: 10%
    padding-bottom: 16px

  entriesHeaderName
    width: 50%
    padding-bottom: 16px

  entiresHeaderScore
    width: 15%
    padding-bottom: 16px

  entriesHeaderDatetime
    width: 25%
    padding-bottom: 16px

  entryItem
    line-height: 60px
    border-bottom: 1px solid rgba(51,88,126,0.2)

    &normal

    &current
      font-weight: bold

  entryRank
    font-size: 20px
    font-weight: bold

  clearfix
    clear: both
`;
