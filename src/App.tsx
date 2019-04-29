import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Header } from './containers';
import { Dimmer } from './components';
import { Spinner } from 'gestalt';

const Home = lazy(() => import('./pages/Home'));
const Ask = lazy(() => import('./pages/Ask'));
const Question = lazy(() => import('./pages/Question'));

export interface IAppProps {
  history: History;
}
class App extends Component<IAppProps> {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Header />
        <Suspense fallback={<Spinner show accessibilityLabel="loading" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ask" component={Ask} />
            <Route exact path="/question/:questionId" component={Question} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    );
  }
}

export default App;
