import * as actions from './actions';

const initialState = {
  metrics: [],
};

const metricsDataRecevied = (state, action) => {
  const { metrics } = action;

  return {
    metrics: [
      ...metrics,
    ],
  };
};

const handlers = {
  [actions.GET_METRICS_DATA]: metricsDataRecevied,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
