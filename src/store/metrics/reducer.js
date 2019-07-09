import * as actions from './actions';

import { getMetricLabelName } from '../../utils';

const initialState = {
  metrics: {},
};

const transformMetricsData = (metricsData) => {
  const returnData = {};

  metricsData.map((metric) => {
    returnData[metric] = getMetricLabelName(metric);

    return null;
  });

  return returnData;
};

const metricsDataRecevied = (state, action) => {
  const { metrics } = action;

  return {
    metrics: transformMetricsData([...metrics]),
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
