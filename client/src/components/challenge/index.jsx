import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Challenge extends React.Component {
  render() {
    return (
      <div style={styles.challenge}>
        <div style={styles.challengeContainer}>
          <div style={styles.challengeHeader}>
            <p style={styles.challengeDate}>Oct 21, 2017</p>
            <h1 style={styles.title}>
              Titanic Survivors
            </h1>
          </div>
          <div style={styles.challengeNavContainer}>
            <ul style={styles.challengeNav}>
              <li style={styles.navItem}>
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
						<p style={styles.description}>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
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
    float: right

  navItem
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: bold
    padding: 12px 0 12px 36px
    float: left

  description
    width: 640px
    margin: 0 auto

  clearfix
    clear: both
`;
