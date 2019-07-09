import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';

import weatherReducer from './weather/reducer';
import metricsReducer from './metrics/reducer';
import measurementsReducer from './measurements/reducer';

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    metrics: metricsReducer,
    measurements: measurementsReducer,
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
