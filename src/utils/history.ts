import { createBrowserHistory, History } from 'history';
import qs from 'query-string';

export const history = createBrowserHistory();

class QueryHelper {
  history: History;
  constructor(history: History) {
    this.history = history;
  }
  get searchQuery() {
    const searchQuery = qs.parse(this.history.location.search);
    return searchQuery || {};
  }

  makeQuery(query: { [key: string]: string | string[] } = {}) {
    return qs.stringify({ ...this.searchQuery, ...query });
  }
}

export const queryHelper = new QueryHelper(history);
