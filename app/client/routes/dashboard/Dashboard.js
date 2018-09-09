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
import s from './Dashboard.css';

class Dashboard extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Social Savings</h1>
          <h2> Your bank account </h2>
          <span>Checking: ${this.props.bank.BankAccount.BankAccountById.checking} </span><br/>
          <span>Savings: ${this.props.bank.BankAccount.BankAccountById.savings} </span>

          <h2> Your social interactions </h2>
          <span>interactions: {this.props.social.SocialProfile.facebookEngagements.total_count} </span><br/>

          <h2> Your social interactions </h2>
          <span>Calculated Savings: ${this.props.social.SocialProfile.facebookEngagements.total_count * .05} </span>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
