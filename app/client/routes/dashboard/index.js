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
  const req = await fetch('/graphql', {
    body: JSON.stringify({
      query: `query{
         BankAccount{
          BankAccountById(_id: "5b95580e43ef4eb29c474190"){
            checking,
            savings
          }
        }
      }
      `,
    }),
  });
  const req2 = await fetch('/graphql', {
    body: JSON.stringify({
      query: `query{
        SocialProfile{
          SocialProfileById(_id: "5b95580e43ef4eb29c474191"){
            interactions,
            dailyInteractions
          }
        }
      }
      `,
    }),
  });

  const resp1 = await req.json();
  const resp2 = await req2.json();
  return {
    title: 'Dashboard',
    chunks: ['home'],
    component: (
      <Layout user={true}>
        <Dashboard bank={resp1.data} social={resp2.data}/>
      </Layout>
    ),
  };
}

export default action;
