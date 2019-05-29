export interface IBaseListQuery {
  page: number;
  perPage: number;
}

export interface ISearchQuestionQuery {
  tags?: string[];
  subject?: string;
  language?: string;
}
