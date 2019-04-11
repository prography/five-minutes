import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Ask = lazy(() => import('./pages/Ask'));
class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ask" component={Ask} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
