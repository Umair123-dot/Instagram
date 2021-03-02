import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider';
import './index.css'

ReactDOM.render(
  ApolloProvider,
  document.getElementById('root')
);

reportWebVitals();
