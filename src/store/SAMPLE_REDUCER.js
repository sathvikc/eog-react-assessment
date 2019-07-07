import {Map, fromJS} from "immutable";

import * as actions from "./actions";

const sampleReducer = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return Map({
      initialized: false,
      fetching: false,
      error: false,
      status: status,
      data: Map(data)
    });
  }

  switch (action.type) {
    case [actions.SAMPLE_DATA_REQUESTED]: 
      return fromJS({
        initialized: false,
        fetching: true,
        error: false,
        status: status,
        data: data
      });

    case [actions.SAMPLE_DATA_RECEIVED]: 
      return fromJS({
        initialized: true,
        fetching: false,
        error: false,
        status: status,
        data: data
      });

    case [actions.SAMPLE_API_ERROR]: 
      return fromJS({
        initialized: false,
        fetching: false,
        error: true,
        status: status,
        data: data
      });

    default:
      return state;
  }
}

export default sampleReducer;
