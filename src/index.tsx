import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styles/theme';
import configureStore, { history } from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/normalize.css';
import './index.css';
import 'gestalt/dist/gestalt.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={myTheme}>
      <App history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
