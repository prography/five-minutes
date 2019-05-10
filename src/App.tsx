import React, { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { NotiPortal } from 'renoti';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, Modal } from './containers';
import { PageLayout } from './styles/common';
import { Dimmer, ScrollChecker } from './components';
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
            <Suspense
              fallback={
                <Dimmer>
                  <CircularProgress />
                </Dimmer>
              }
            >
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
        <Modal />
        <NotiPortal notifier={notifier} />
      </Router>
    );
  }
}

export default App;
