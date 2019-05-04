// action creator 객체를 모아서 유니온 타입으로
export type ActionTypes<
  T extends { [K in keyof T]: T[K] }
> = T[keyof T] extends (...args: any[]) => any
  ? ReturnType<T[keyof T]>
  : T[keyof T];

/*
  일반적인 action creator
*/
export const createActionCreator = <T>(type: T) => <TP>() => (args: TP) =>
  ({ type, payload: args } as const);
// export const createActionCreator = <T, F extends (...args: any[]) => any>(
//   type: T,
//   payloadFunc: F,
// ) => {
//   return (...payload: Parameters<F>): { type: T; payload: ReturnType<F> } =>
//     ({
//       type,
//       payload: payloadFunc(payload),
//     } as const);
// };

/*
   일반적인 async action creator
*/
export const createAsyncActionCreator = <R, S, F>(
  request: R,
  success: S,
  failure: F,
) => {
  return <RP, SP, FP>() => ({
    request: (args: RP) => ({ type: request, payload: args } as const),
    success: (args: SP) => ({ type: success, payload: args } as const),
    failure: (args: FP) => ({ type: failure, payload: args } as const),
  });
};

/*
const { getTags, getTagsSuccess } = mapActionCreator({
  getTags: ['GET_TAGS', (param: { page: number; perPage: number }) => param],
  getTagsSuccess: ['GET_TAGS_SCUCESS', (param: { page: number }) => param],
});

Object로 함수이름 mapping 하고 싶을 때 사용
*/
type ActionTuple<T, F extends (...args: any[]) => any> = [T, F];
export const mapActionCreator = <
  T extends { [K in keyof T]: ActionTuple<T[K][0], T[K][1]> }
>(
  types: T,
) => {
  const actions = (Object.entries(types) as Array<
    [keyof T, ActionTuple<T[keyof T][0], T[keyof T][1]>]
  >).reduce(
    (acc, [func, [type, payloadFunc]]) => {
      acc = {
        ...acc,
        [func]: (...args: Parameters<typeof payloadFunc>) =>
          ({
            type,
            payload: payloadFunc(args),
          } as const),
      };
      return acc;
    },
    {} as {
      [K in keyof T]: (
        ...args: Parameters<T[K][1]>
      ) => {
        type: T[K][0];
        payload: ReturnType<T[K][1]>;
      }
    },
  );
  return actions;
};
