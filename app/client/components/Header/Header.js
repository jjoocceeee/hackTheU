/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './socialSavings.png';
import logoUrl2x from './socialSavings.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation user={this.props.user}/>
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <span className={s.brandTxt}>Social Savings</span>
          </Link>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Social Savings</h1>
            <p className={s.bannerDesc}>Your Social Media & Money in harmony</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
