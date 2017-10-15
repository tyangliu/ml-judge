import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Leaderboard extends React.Component {
  render() {
    return (
      <div style={styles.leaderboard}>
        <ul style={styles.entries}>
          <li style={styles.entryItem}>
            Hi
          </li>
        </ul>
      </div>
    );
  }
}

const styles = styler`
  leaderboard
    width: 100%

  description
    width: 640px
    margin: 0 auto

  clearfix
    clear: both
`;
