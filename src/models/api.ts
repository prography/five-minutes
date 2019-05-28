export interface IBaseListQuery {
  page: number;
  perPage: number;
}

export interface ISearchQuestionQuery extends IBaseListQuery {
  tags?: string[];
  subject?: string;
  language?: string;
}
