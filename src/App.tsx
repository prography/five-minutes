import React, { Component, lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Header } from './containers';
import { PageLayout } from './styles/common';
import { ScrollChecker } from './components';
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
        <ScrollChecker history={history}>
          <PageLayout>
            <Suspense fallback={<Spinner show accessibilityLabel="loading" />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/ask" component={Ask} />
                <Route
                  exact
                  path="/question/:questionId"
                  component={Question}
                />
              </Switch>
            </Suspense>
          </PageLayout>
        </ScrollChecker>
      </ConnectedRouter>
    );
  }
}

export default App;
