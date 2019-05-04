import React, { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { NotiPortal } from 'renoti';
import { Spinner } from 'gestalt';
import { Header } from './containers';
import { PageLayout } from './styles/common';
import { ScrollChecker } from './components';
import { notifier } from './utils/renoti';

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
      <Router history={history}>
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
        <NotiPortal notifier={notifier} />
      </Router>
    );
  }
}

export default App;
