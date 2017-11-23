import React from 'react';
import Radium from 'radium';
import ReactMarkdown from 'react-markdown'; import styler from 'react-styling';

@Radium
export default class ChallengeInfo extends React.Component {
  render() {
    const {challenge} = this.props;
    return (
      <div style={styles.challengeInfo}>
        <ul style={styles.info}>
          <li style={styles.infoItem}>
            <span style={styles.infoItemLabel}>
              Difficulty:&nbsp;
            </span>
            <span style={styles.infoItemValue}>
              {challenge.difficulty}
            </span>
          </li>
          <li style={styles.infoItem}>
            <span style={styles.infoItemLabel}>
              Type:&nbsp;
            </span>
            <span style={styles.infoItemValue}>
              {challenge.type}
            </span>
          </li>
        </ul>
        <div style={styles.description}>
          <ReactMarkdown source={challenge.description}/>
        </div>
      </div>
    );
  }
}

const styles = styler`
  challengeInfo
    width: 100%

  info
    border-bottom: 1px solid rgba(51,88,126,0.2)
    padding-bottom: 16px
    width: 640px
    margin: 0 auto 24px

  infoItem
    display: inline-block
    margin-right: 36px

  infoItemLabel
    font-style: italic

  infoItemValue

  description
    width: 640px
    margin: 0 auto
    border-bottom: 1px solid rgba(51,88,126,0.2)
    padding-bottom: 14px

  clearfix
    clear: both
`;
