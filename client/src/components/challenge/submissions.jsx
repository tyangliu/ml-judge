import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import Dropzone from 'react-dropzone';
import XDate from 'xdate';

const MAX_SIZE = 50 * Math.pow(10, 6);
const ACCEPT = 'application/zip,application/x-zip, application/x-zip-compressed';

@Radium
export default class Submissions extends React.Component {
  state = {
    files: [],
  };

  onDrop = files => {
    this.setState({files});
  };

  onSubmit = () => {
    const {challenge, user, sendChallenge} = this.props;

    if (user == null) {
      return;
    }

    const {files} = this.state;
    if (files.length != 1) {
      return;
    }    
    
    sendChallenge(challenge.id, user.token, files[0]);
  };

  componentWillMount() {
    const {challenge, user, getSubmissions} = this.props;
    if (!user || !challenge) {
      return;
    }
    getSubmissions(challenge.id, user.token);
  }

  render() {
    const {challenge, submissions} = this.props;
    const {files} = this.state;
    const file = files.length == 1 ? files[0] : null;

    let bestSubmission = 0;
    let bestSubmissionScore = 0;
    submissions.forEach((sub, i) => {
      if (challenge.score_order == 'reverse') {
        if (sub.score < bestSubmissionScore) {
          bestSubmission = i;
          bestSubmissionScore = sub.score;
        }
      } else if (sub.score > bestSubmissionScore) {
        bestSubmission = i;
        bestSubmissionScore = sub.score;
      }
    });

    const subRows = submissions.map((sub, i) => {
      const isBest = i == bestSubmission;
      return ( 
        <tr style={styles.entryItem[isBest ? 'best' : 'normal']} key={sub.sub_id}>
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
          <Dropzone
            style={styles.upload}
            multiple={false}
            accept={ACCEPT}
            maxSize={MAX_SIZE}
            onDrop={this.onDrop}
          >
            <i style={styles.uploadIcon} className='material-icons'>
              file_upload
            </i>
            {file == null
              ? <p style={styles.uploadText}>
                  Drag or choose a file from your computer
                </p>
              : <p style={styles.uploadText}>
                  {file.name}
                </p>
            }
          </Dropzone>
          <button
            style={styles.submitButton}
            onClick={this.onSubmit}
          >
            Submit
          </button>
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
              {subRows}
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

  submitButton
    display: block
    margin: 20px auto
    outline: none
    border: none
    font-family: 'mr-eaves-xl-sans', sans-serif
    font-size: inherit
    font-weight: bold
    text-transform: uppercase
    letter-spacing: 1px
    color: rgba(255,255,255,1)
    background: rgba(51,88,126,1)
    padding: 9px 14px
    border-radius: 2px

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
