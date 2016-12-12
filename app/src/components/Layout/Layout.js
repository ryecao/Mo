/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Search from '../Search';
import Favorites from '../Favorites';
import Recommendation from '../Recommendation';

class Layout extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div>
        <div className={s.frame}>
          <Search />
          <Recommendation />
          <Favorites />
        </div>
        <div className={s.info}>
          <p> a CS558 project</p>
          <p> Zhendong Cao (zhendong.cao@yale.edu) & Shiying Xu (shiying.xu@yale.edu) </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
