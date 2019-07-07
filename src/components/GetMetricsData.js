import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';

import * as metricActions from '../store/metrics/actions';

const query = `query {getMetrics}`;

const GetMetricsData = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({ query, });

  const { fetching, data, error } = result;

  useEffect(() => {
    if(!data) return;

    const { getMetrics = [] } = data || {};

    dispatch({ type: metricActions.GET_METRICS_DATA, metrics: getMetrics });
  }, [dispatch, data]);

  return null;
}

export default GetMetricsData;