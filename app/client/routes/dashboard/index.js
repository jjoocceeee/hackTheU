/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Dashboard from './Dashboard';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `query{
         BankAccount{
          BankAccountById(_id: "5b95443618c6e8f8347129da"){
            checking,
            savings
          }
        }
      }
      `,
    }),
  });
  const { data } = await resp.json();
  return {
    title: 'Dashboard',
    chunks: ['home'],
    component: (
      <Layout user={true}>
        <Dashboard data={data}/>
      </Layout>
    ),
  };
}

export default action;
