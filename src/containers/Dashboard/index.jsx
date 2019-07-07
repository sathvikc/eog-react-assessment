import React, { Fragment, useState } from 'react';

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
  const onMetricSelect = (selectedMetrics, metricsData) => {
    setState({
      selectedMetrics,
      metricsData
    });
  };

  const {selectedMetrics, metricsData} = state;

  return (
    <Fragment>
      <div className={classes.dashboardContainer}>
        <Metrics onStateChange={onMetricSelect} />

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