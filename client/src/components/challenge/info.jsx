import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class ChallengeInfo extends React.Component {
  render() {
    return (
      <div style={styles.challengeInfo}>
        <ul style={styles.info}>
          <li style={styles.infoItem}>
            <span style={styles.infoItemLabel}>
              Difficulty:&nbsp;
            </span>
            <span style={styles.infoItemValue}>
              Easy
            </span>
          </li>
          <li style={styles.infoItem}>
            <span style={styles.infoItemLabel}>
              Type:&nbsp;
            </span>
            <span style={styles.infoItemValue}>
              Classification (Binary)
            </span>
          </li>
        </ul>
        <div style={styles.description}>
          <h2 style={styles.descriptionHeading}>
            Background
          </h2>
          <p style={styles.descriptionText}>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
          <h2 style={styles.descriptionHeading}>
            Input Data
          </h2>
          <p style={styles.descriptionText}>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
          <h2 style={styles.descriptionHeading}>
            Scoring
          </h2>
          <p style={styles.descriptionText}>
Your score for this challenge will be the percentage of correct predictions on the test set, rounded to nearest 10th of a percent (same scores post-rounding will be tied).
          </p>
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

  descriptionHeading
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-weight: bold
    font-size: 22px
    line-height: 36px
    margin-bottom: 4px

  descriptionText
    margin-bottom: 26px

  clearfix
    clear: both
`;
