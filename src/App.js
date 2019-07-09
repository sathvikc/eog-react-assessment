import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import {
  Provider as URQLProvider, createClient, defaultExchanges, subscriptionExchange,
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import createStore from './store';

import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Subscribe from './components/Subscribe';
import GetMetricsData from './components/GetMetricsData';

import { Dashboard } from './containers';

const store = createStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      main: 'rgb(226,231,238)',
    },
  },
});

const subscriptionClient = new SubscriptionClient(
  'ws://react.eogresources.com/graphql',
  {
    reconnect: true,
    timeout: 20000,
  },
);

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <URQLProvider value={client}>
        <Wrapper>
          <Subscribe />
          <GetMetricsData />
          <Header />
          <Dashboard />
          <ToastContainer />
        </Wrapper>
      </URQLProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
