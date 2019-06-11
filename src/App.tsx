import React, { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import { NotiPortal } from 'renoti';
import { Header, Modal } from './containers';
import {
  ScrollChecker,
  ProtectedRoute,
  PrevLocation,
  LoadingBar,
} from './components';
import { notifier } from './utils/renoti';
import { IRootState } from './reducers';
import { PageLayout } from './styles/common';

const Home = lazy(() => import('./pages/Home'));
const Ask = lazy(() => import('./pages/Ask'));
const Question = lazy(() => import('./pages/Question'));
const QuestionEdit = lazy(() => import('./pages/QuestionEdit'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));
const Search = lazy(() => import('./pages/Search'));
const TagSearch = lazy(() => import('./pages/TagSearch'));

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
            <Suspense fallback={<LoadingBar />}>
              <PageLayout>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <ProtectedRoute exact path="/ask" component={Ask} />
                  <ProtectedRoute
                    exact
                    path="/question/:questionId/edit"
                    component={QuestionEdit}
                  />
                  <Route
                    exact
                    path="/question/:questionId"
                    component={Question}
                  />
                  <ProtectedRoute
                    path="/profile/:userId/edit"
                    component={ProfileEdit}
                  />
                  <Route path="/profile/:userId" component={Profile} />
                  <Route path="/search" component={Search} />
                  <Route path="/tagged/:tag" component={TagSearch} />
                </Switch>
              </PageLayout>
            </Suspense>
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
