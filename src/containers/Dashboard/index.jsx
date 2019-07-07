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

   // Get reducer data from store
  const [metricsData, measurementsData] = useSelector((store) => {
    const { metrics, measurements } = store;

    const metricsData = metrics.metrics;
    const measurementsData = measurements;

    return [metricsData, measurementsData];
  });

  const {selectedMetrics} = state;

  const displayCards = [];
  
  Array.isArray(selectedMetrics) && selectedMetrics.map((metric) => {
    const metricName = metric;
    const labelName = metricsData[metricName];
    const measurementData = measurementsData[metricName];

    if(Array.isArray(measurementData)) {
      const measurementDataLength = measurementData.length;
      const metricValue = measurementData[measurementDataLength - 1].value;

      displayCards.push({
        id: metricName,
        label: labelName, 
        value: metricValue
      });
    }

    return null;
  });

  return (
    <Fragment>
      <div className={classes.dashboardContainer}>
        <Metrics metricsData={metricsData} onStateChange={onMetricSelect} />

        <Cards cardsData={displayCards}  />
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