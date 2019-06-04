import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime'; // generator를 es2015로 runtime에 바꿔줌.
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStoreDev = (initialState?: object): Store => {
  const middlewares = [
    /* redux-logger 같은거 넣어주면 될듯 */
    sagaMiddleware,
  ];
  // redux devtool과 middleware를 compose
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // !는 typescript보다 내가 type을 더 잘할 때,
  // 있다고 확신할 때 쓰면 됨.
  const store: Store = createStore(
    rootReducer,
    initialState!,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  // 반드시 store을 먼저 생성하고 run을 한다.
  sagaMiddleware.run(rootSaga);
  return store;
};

const configureStoreProd = (initialState?: object): Store => {
  const middlewares = [
    /* redux-logger 같은거 넣어주면 될듯 */
    sagaMiddleware,
  ];
  // !는 typescript보다 내가 type을 더 잘할 때,
  // 있다고 확신할 때 쓰면 됨.
  const store: Store = createStore(
    rootReducer,
    initialState!,
    applyMiddleware(...middlewares),
  );
  // 반드시 store을 먼저 생성하고 run을 한다.
  sagaMiddleware.run(rootSaga);
  return store;
};

const configureStore: () => Store =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
