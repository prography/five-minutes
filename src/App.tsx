import React, { Component, lazy, Suspense, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import { NotiPortal } from 'renoti';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, Modal } from './containers';
import { PageLayout } from './styles/common';
import {
  Dimmer,
  ScrollChecker,
  ProtectedRoute,
  PrevLocation,
} from './components';
import { notifier } from './utils/renoti';
import { IRootState } from './reducers';

const Home = lazy(() => import('./pages/Home'));
const Ask = lazy(() => import('./pages/Ask'));
const Question = lazy(() => import('./pages/Question'));
const Profile = lazy(() => import('./pages/Profile'));

export interface IAppProps {
  meStatus: Status;
  history: History;
}
class App extends Component<IAppProps> {
  render() {
    const { history, meStatus } = this.props;
    if (meStatus === 'INIT' || meStatus === 'FETCHING') {
      return null;
    }
    return (
      <Router history={history}>
        <Header />
        <PrevLocation>
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
                  <ProtectedRoute exact path="/ask" component={Ask} />
                  <Route
                    exact
                    path="/question/:questionId"
                    component={Question}
                  />
                  <ProtectedRoute
                    path="/profile/:nickname"
                    component={Profile}
                  />
                </Switch>
              </Suspense>
            </PageLayout>
          </ScrollChecker>
        </PrevLocation>
        <Modal />
        <NotiPortal notifier={notifier} />
      </Router>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  meStatus: state.auth.me.status,
});
export default connect(mapStateToProps)(App);
