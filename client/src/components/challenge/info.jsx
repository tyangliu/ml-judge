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
          </li>
        </ul>
        <p style={styles.description}>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </p>
      </div>
    );
  }
}

const styles = styler`
  challengeInfo
    width: 100%

  description
    width: 640px
    margin: 0 auto

  clearfix
    clear: both
`;
