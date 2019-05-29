import { createBrowserHistory, History } from 'history';
import qs from 'query-string';
import { pick, removeEmpty } from './object';
import { ISearchQuestionQuery, IBaseListQuery } from '../models/api';

export const history = createBrowserHistory();

class QueryHelper<T extends string[]> {
  history: History;
  searchField: T;
  constructor(history: History, fields: T) {
    this.history = history;
    this.searchField = fields;
  }
  get searchQuery(): {
    [key: string]: string | string[];
    page: string;
  } {
    const { page, ...naiveSearchQuery } = qs.parse(
      this.history.location.search,
    );
    const getTypeSafePage = (
      p: string | string[] | null | undefined,
      initial: string,
    ) => {
      if (!p) return initial;
      if (Array.isArray(p)) return p[0];
      return p;
    };
    const searchQuery = removeEmpty(
      pick(naiveSearchQuery, this.searchField),
    ) as { [key: string]: string | string[] };
    return {
      page: getTypeSafePage(page, '1'),
      ...searchQuery,
    };
  }
  // ''로부터 새로운 쿼리 만들기
  makeQuery(query: { [key: string]: string | string[] } = {}) {
    return qs.stringify(removeEmpty(query));
  }
  // 기존 query와 merge
  mergeQuery(query: { [key: string]: string | string[] } = {}) {
    return qs.stringify({ ...this.searchQuery, ...removeEmpty(query) });
  }
}

export const questionQueryHelper = new QueryHelper(history, [
  'subject',
  'tags',
  'languages',
]);
