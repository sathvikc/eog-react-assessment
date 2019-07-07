import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSubscription } from "urql";

const subscriptionQuery = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

const Subscribe = () => {
  const dispatch = useDispatch();

  const [subscriptionResponse] = useSubscription({ query: subscriptionQuery });
  const { data: subscriptionData } = subscriptionResponse;

  useEffect(() => {
      if (!subscriptionData) return;

      console.log("New Measurement", subscriptionData.newMeasurement);
    }, [subscriptionData, dispatch]
  );

  return null;
};

export default Subscribe;
