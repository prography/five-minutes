// api status
declare type Status = 'INIT' | 'FETCHING' | 'SUCCESS' | 'FAILURE';

// Get 일반 조회
declare interface ApiGetResponse<T> {
  result: T;
}
// Get List 조회
declare interface ApiGetListResponse<T> {
  page: number;
  totalCount: number;
  count: number;
  perPage: number;
  items: T[];
}

// saga effect 리턴 값을 잡아줌
declare type SagaEffect<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : ReturnType<T>;
