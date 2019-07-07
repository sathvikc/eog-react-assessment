import * as actions from './actions';

const initialState = {};

const transformMeasurementData = (measurement, state) => {
  const metricName = measurement.metric;
  const prevMeasurements = state[metricName] || [];

  return {
    ...state,
    [metricName]: [...prevMeasurements, measurement]
  }
}

const measurementDataRecevied = (state, action) => {
  const { measurement } = action;

  return transformMeasurementData(measurement, state);
};

const handlers = {
  [actions.NEW_MEASUREMENT_RECEIVED]: measurementDataRecevied,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
