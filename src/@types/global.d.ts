// api status
declare type Status = 'INIT' | 'FETCHING' | 'SUCCESS' | 'FAILURE';

// 일반적인 promise 형태 api
declare type ApiCall<T, R> = (args: T) => Promise<R>;

// 일반적인 api response type
declare interface ApiResponse<T> {
  result: T;
}
// Get List 조회
declare interface ApiGetListResponse<T> {
  page: number;
  totalCount: number;
  count: number;
  perPage: number;
  prevPage: string;
  nextPage: string;
  items: T[];
}

// saga effect 리턴 값을 잡아줌
declare type SagaEffect<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : ReturnType<T>;

// promise 언패킹
declare type UnpackPromise<T> = T extends Promise<infer U> ? U : any;
