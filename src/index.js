import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import keys from './config';

import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: keys.storefrontAccessToken,
  domain: 'young-nauseous.myshopify.com'
});

ReactDOM.render(
  <App client={client} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
