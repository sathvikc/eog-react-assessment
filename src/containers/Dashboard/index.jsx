import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Metrics from './Metrics';
import Cards from './Cards';
import Chart from './Chart';

const useStyles = makeStyles({
  dashboardContainer: {
    margin: '10px',
  }
});

const Dashboard = () => {
  const classes = useStyles();

  const [state, setState] = useState({});

  // Metric component callback function
  const onMetricSelect = (selectedMetrics) => {
    setState({
      selectedMetrics
    });
  };

   // Get metrics data from `metrics` reducer
  const metricsData = useSelector((store) => {
    const { metrics } = store.metrics;

    return metrics;
  });

  const {selectedMetrics} = state;

  return (
    <Fragment>
      <div className={classes.dashboardContainer}>
        <Metrics metricsData={metricsData} onStateChange={onMetricSelect} />

        <Cards selectedMetrics={selectedMetrics} metricsData={metricsData}  />
      </div>

      {
        Array.isArray(selectedMetrics) 
        && selectedMetrics.length ? (
          <Chart selectedMetrics={selectedMetrics} />
        ) : (
          ''
        )
      }
    </Fragment>
  );
}

export default Dashboard;