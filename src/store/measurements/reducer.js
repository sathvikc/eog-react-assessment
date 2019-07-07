import * as actions from './actions';

const initialState = {
  measurements: []
};

const measurementDataRecevied = (state, action) => {
  const { measurement } = action;

  return { 
    measurements: [...state.measurements, measurement]
  };
};

const handlers = {
  [actions.NEW_MEASUREMENT_RECEIVED]: measurementDataRecevied,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
