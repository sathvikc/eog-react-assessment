import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

import * as metricActions from '../../store/metrics/actions';

const query = `query {getMetrics}`;

const Metrics = (props) => {
  const [state, setState] = useState([]);
  
  /****** Requesting Metrics Service and Storing it in Metrics Reducer ******/
  const dispatch = useDispatch();
  const [result] = useQuery({ query, });

  const { fetching, data, error } = result;

  useEffect(() => {
    if(!data) return;

    const { getMetrics = [] } = data || {};

    dispatch({ type: metricActions.GET_METRICS_DATA, metrics: getMetrics });
  }, [dispatch, data]);
  /****** Metrics Service Ending  ******/

  // Get metrics data from `metrics` reducer
  const metricsData = useSelector((store) => {
    const { metrics } = store.metrics;

    return metrics;
  });

  // Send Callback on state change
  const { onStateChange } = props;

  useEffect(() => {
    onStateChange(state, metricsData);
  }, [state, metricsData]);

  // Checkbox form onChange Event handler
  const handleChange = metricName => (event) => {
    const selectedChoices = [...state];
  
    if (event.target.checked) {
      selectedChoices.push(metricName);
    } else {
      const index = selectedChoices.indexOf(metricName);
  
      if (index > -1) {
        selectedChoices.splice(index, 1);
      }
    }
  
    setState([
      ...selectedChoices,
    ]);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Metrics:</FormLabel>
      <FormGroup row>
        {
          Object.keys(metricsData).map((metric) => {
            const metricName = metric;
            const metricLabelName = metricsData[metricName];

            return (
              <FormControlLabel
                key={metric}
                control={(
                  <Checkbox
                    checked={state[metricName]}
                    onChange={handleChange(metricName)}
                    value={metricName}
                    color="primary"
                  />
                )}
                label={metricLabelName}
              />
            );
          }
        )}
      </FormGroup>
    </FormControl>
  );
}

export default Metrics;