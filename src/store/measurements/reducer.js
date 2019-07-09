import produce from 'immer';

import { getMetricLabelName } from '../../utils';

import * as actions from './actions';

const initialState = {
  measurements: {},
  measurement: {},
};

const mutipleMeasurementsDataReceived = (state, action) => produce(state, (draftState) => {
  const { measurements, metric } = action;

  if (metric) {
    const allMetricMeasurements = measurements.getMeasurements;
    const unit = allMetricMeasurements[0] && allMetricMeasurements[0].unit;

    draftState.measurements[metric] = {
      label: getMetricLabelName(metric),
      name: metric,
      unit,
      data: allMetricMeasurements,
    };
  }

  return draftState;
});

const measurementDataReceived = (state, action) => produce(state, (draftState) => {
  const { measurement } = action;
  const { metric } = measurement;

  // Measurement Object
  draftState.measurement[metric] = measurement;

  // Measurement(s) Object
  const measurements = draftState.measurements[metric];

  if (measurements) {
    measurements.data.push(measurement);
  }

  return draftState;
});

const handlers = {
  [actions.NEW_MEASUREMENT_RECEIVED]: measurementDataReceived,
  [actions.MULTIPLE_MEASUREMENTS_RECEIVED]: mutipleMeasurementsDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
