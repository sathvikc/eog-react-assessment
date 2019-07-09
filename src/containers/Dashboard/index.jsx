import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';

import { makeStyles } from '@material-ui/core/styles';

import Metrics from './Metrics';
import Cards from './Cards';
import Chart from './Chart';

import * as measurementActions from '../../store/measurements/actions';

import { getThirtyMinutesBeforeTimestamp } from '../../utils';

const query = `
  query($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      at
      value
      metric
      unit
    }
  }`;

const useStyles = makeStyles({
  dashboardContainer: {
    margin: '10px',
  }
});

const transformChartData = (measurementsData, selectedMetrics) => {
  const chartData = [];

  selectedMetrics.map((metric) => {
    chartData.push(measurementsData[metric]);

    return null;
  });

  if(chartData.includes(undefined)) {
    return null;
  }

  return chartData;
}

const afterTimestamp = getThirtyMinutesBeforeTimestamp();

const Dashboard = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    selectedMetrics: [],
    latestSelectedMetric: ''
  });

  // Metric component callback function
  const onMetricSelect = (selectedMetrics, latestSelectedMetric) => {
    setState({
      selectedMetrics,
      latestSelectedMetric
    });
  };

   // Get reducer data from store
  const [metricsData, measurementsData, measurementData] = useSelector((store) => {
    const { metrics, measurements } = store;

    const metricsData = metrics.metrics;

    const measurementsData = measurements.measurements;
    const measurementData = measurements.measurement;

    return [metricsData, measurementsData, measurementData];
  });

  let {selectedMetrics, latestSelectedMetric} = state;

  // Card Component Data
  const displayCards = [];
  
  selectedMetrics.map((metric) => {
    const metricName = metric;
    const labelName = metricsData[metricName];
    const measurement = measurementData[metricName] || {};
    const metricValue = measurement.value;

    displayCards.push({
      id: metricName,
      label: labelName, 
      value: metricValue
    });

    return null;
  });
  
  // Charts
  const dispatch = useDispatch();
  
  const receiveMeasurements = useCallback((data, latestSelectedMetric) => {
    dispatch({
      type: measurementActions.MULTIPLE_MEASUREMENTS_RECEIVED, 
      measurements: data,
      metric: latestSelectedMetric
    });
  }, [dispatch]);

  const [result] = useQuery({ 
    query,
    variables: {
      input: {
        metricName: latestSelectedMetric,
        after: afterTimestamp
      }
    }
  }, [latestSelectedMetric]);

  const { data } = result;

  useEffect(() => {
    if(!data) return;
    
    receiveMeasurements(data, latestSelectedMetric);
  }, [receiveMeasurements, data]);

  const chartData = transformChartData(measurementsData, selectedMetrics);

  return (
    <Fragment>
      <div className={classes.dashboardContainer}>
        <Metrics metricsData={metricsData} onStateChange={onMetricSelect} />

        <Cards cardsData={displayCards}  />
      </div>

      {
        selectedMetrics.length ? (
          <Chart data={chartData} />
        ) : (
          ''
        )
      }
    </Fragment>
  );
}

export default Dashboard;