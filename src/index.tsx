import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import configureStore from './store/configureStore';
import { materialTheme, styledTheme } from './styles/theme';
import { history } from './utils/history';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'highlight.js/styles/github.css';
import './styles/normalize.css';
import './styles/markdown.css';
import './index.css';
import 'renoti/dist/Renoti.css';
import './styles/renoti.css'; // overriding

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={materialTheme}>
      <ThemeProvider theme={styledTheme}>
        <App history={history} />
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
