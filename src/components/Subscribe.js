import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSubscription } from "urql";

import * as measurementActions from "../store/measurements/actions";

const subscriptionQuery = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

const Subscribe = () => {
  const dispatch = useDispatch();

  const receiveNewMeasurement = useCallback(subscriptionData => dispatch({
      type: measurementActions.NEW_MEASUREMENT_RECEIVED,
      measurement: subscriptionData.newMeasurement,
    }),
    [dispatch]
  );

  const [subscriptionResponse] = useSubscription({ query: subscriptionQuery });
  const { data: subscriptionData } = subscriptionResponse;

  useEffect(() => {
      if (!subscriptionData) return;

      receiveNewMeasurement(subscriptionData);
    }, [subscriptionData, dispatch, receiveNewMeasurement]
  );

  return null;
};

export default Subscribe;
