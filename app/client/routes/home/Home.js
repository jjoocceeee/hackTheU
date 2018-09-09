/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
        <h1> How It works:</h1>

        <h2>Socially Saving - Your Social Media & Money Working Together. Save based on your social media activity in one location

        Link Your bank Account

        Set Your Triggers

        Start Scrolling to Savings </h2>

          <h2>Intro:</h2>

          <p>Socially Saving
          Your Social Media & Money in harmony
          Introducing Social Saving - the first app that helps you save through social media.
          </p>

          <h2>Triggers:</h2>

          <p>My Interactions
          Triggered Savings
          Customize your Triggers to automatically save while scrolling.
          </p>

          <h2>Making Money:</h2>

          <p>Social Stardom:
          Gain rewards for hitting milestones with likes on your content.
          </p>
          <h2>Account:</h2>

          <p>Watch your account grow with Achievement Dividends. Your money also earns 2% in a free FDIC-insured savings account.
          </p>
          <h2>Security:</h2>

          <p>We Got Your Back

          FDIC Insurance
          Bank-Level Security
          Encryption
          Security Alerts
          100% free.</p>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
