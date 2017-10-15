import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Leaderboard extends React.Component {
  render() {
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
            <tr style={styles.entryItem}>
              <td style={styles.entryRank}>
                1
              </td>
              <td style={styles.entryName}>
                Potato            
              </td>
              <td style={styles.entryScore}>
                96.70
              </td>
              <td style={styles.entryDatetime}>
                2/12/2017 9:00PM
              </td>
            </tr>
            <tr style={styles.entryItem.current}>
              <td style={styles.entryRank}>
                2
              </td>
              <td style={styles.entryName}>
                Potato            
              </td>
              <td style={styles.entryScore}>
                95.74
              </td>
              <td style={styles.entryDatetime}>
                2/12/2017 9:00PM
              </td>
            </tr>
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
