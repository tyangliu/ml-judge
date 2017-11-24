import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import {Switch, Route, Link} from 'react-router-dom';

import ChallengeInfo from './info';
import Leaderboard from './leaderboard';

@Radium
export default class ChallengeNavigation extends React.Component {
  links = [
    {
      path: '',
      display: 'Challenge',
    },
    /*
    {
      path: '/resources',
      display: 'Resources',
    },
    */
    {
      path: '/submissions',
      display: 'Submissions',
      requireLogin: true,
    },
    {
      path: '/leaderboard',
      display: 'Leaderboard',
    }, 
  ];

  render() { 
    const {user, params} = this.props;
    const basePath = `/challenges/${params.challengeId}`;

    const links = this.links.map(link => {
      if (link.requireLogin && !user) {
        return null;
      }
      const linkPath = basePath + link.path;
      return (
        <li style={
            styles.navItem[linkPath === this.props.location.pathname ? 'current' : 'normal']
        } key={link.path}>
          <Link to={linkPath} style={styles.navItemLink}>
            {link.display}
          </Link>
        </li>
      );
    });
    return (
      <div style={styles.challengeNavContainer}>
        <ul style={styles.challengeNav}>
          {links}
        </ul>
        <div style={styles.clearfix}/>
      </div>
    );
  }
}

const styles = styler`
  challengeNavContainer
    border-bottom: 1px solid rgba(51,88,126,0.2)
    margin-bottom: 36px

  challengeNav
    font-family: 'mr-eaves-xl-sans', sans-serif
    float: right

  navItem
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: bold
    float: left

    &.normal

    &.current
      border-bottom: 4px solid rgba(1, 88, 126, 0.2)

  navItemLink
    display: block
    padding: 12px 18px 8px 18px

  clearfix
    clear: both
`;
