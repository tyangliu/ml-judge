import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Submissions extends React.Component {
  render() {
    return (
      <div style={styles.submissions}>
        <div style={styles.submissionForm}>
          <h2 style={styles.heading}>
            Submit
          </h2>
          <p style={styles.paragraph}>
            Your submission should be a zip file containing:
          </p>
          <ul style={styles.submissionList}>
            <li>
              <span style={styles.filename}>src/</span>
              &mdash;directory containing your source code files.
            </li>
            <li>
              <span style={styles.filename}>predictions.csv</span>
              &mdash;your predictions for the test set.
            </li>
            <li>
              <span style={styles.filename}>readme.txt</span>
              &mdash;Text file with a brief summary of your approach and model.
            </li>
          </ul>
          <div style={styles.upload}>
            <i style={styles.uploadIcon} className='material-icons'>
              file_upload
            </i>
            <p style={styles.uploadText}>
              Drag or choose a file from your computer
            </p>
          </div>
        </div>
        <div style={styles.submissionHistory}>
          <h2 style={styles.heading}>
            History
          </h2>
          <table style={styles.entries}>
            <tbody>
              <tr style={styles.entriesHeader}>
                <th style={styles.entriesHeaderScore}>
                  Score
                </th>
                <th style={styles.entriesHeaderDatetime}>
                  Submitted
                </th>
              </tr>
              <tr style={styles.entryItem.best}>
                <td style={styles.entryScore}>
                  96.70
                </td>
                <td style={styles.entryDatetime}>
                  2/12/2017 9:00PM
                </td>
              </tr>
              <tr style={styles.entryItem}>
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
      </div>
    );
  }
}

const styles = styler`
  submissions
    width: 100%

  heading
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-size: 22px
    font-weight: bold
    padding-bottom: 16px 
    margin-bottom: 16px
    border-bottom: 1px solid rgba(51,88,126,0.2)

  paragraph
    margin-bottom: 16px

  submissionForm
    margin-bottom: 42px

  submissionList
    list-style-type: disc
    margin-bottom: 16px

  filename
    font-weight: bold

  upload
    width: 100%
    background: rgba(51,88,126,0.04)
    border: 2px dashed rgba(51,88,126,0.2)
    text-align: center
    font-family: 'mr-eaves-xl-sans', sans-serif
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: bold
    padding: 40px 0
    cursor: pointer

  uploadText
    margin-bottom: 0

  uploadIcon
    color: rgba(51,88,126,0.8)
    font-size: 60px

  entries
    width: 100%

  entriesHeader
    text-align: left
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-weight: bold
    text-transform: uppercase
    letter-spacing: 1px
    border-bottom: 1px solid rgba(51,88,126,0.2)

  entiresHeaderScore
    padding-bottom: 16px

  entriesHeaderDatetime
    width: 25%
    padding-bottom: 16px

  entryItem
    line-height: 60px
    border-bottom: 1px solid rgba(51,88,126,0.2)

    &normal

    &best
      font-weight: bold

  clearfix
    clear: both
`;
