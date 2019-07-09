import React, { useState, useEffect } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

let latestSelectedMetric = '';

const Metrics = (props) => {
  const [state, setState] = useState([]);

  // Send Callback on state change
  const { metricsData, onStateChange } = props;

  useEffect(() => {
    onStateChange(state, latestSelectedMetric);
  }, [state, onStateChange]);

  // Checkbox form onChange Event handler
  const handleChange = metricName => (event) => {
    const selectedChoices = [...state];
  
    if (event.target.checked) {
      latestSelectedMetric = metricName;
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
};

export default Metrics;