import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';

const Home = lazy(() => import('./pages/Home'));
const Ask = lazy(() => import('./pages/Ask'));

export interface IAppProps {
  history: History;
}
class App extends Component<IAppProps> {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ask" component={Ask} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    );
  }
}

export default App;
