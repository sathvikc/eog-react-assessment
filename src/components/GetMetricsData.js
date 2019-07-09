import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as metricActions from '../store/metrics/actions';

const query = 'query {getMetrics}';

const useStyles = makeStyles(theme => ({
  progressBarContainer: {
    margin: '10px',
  },
  errorContainer: {
    display: 'block',
    margin: '20px 10px',
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const GetMetricsData = (props) => {
  const { children } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const getMetricsData = useCallback((getMetrics) => {
    dispatch({ type: metricActions.GET_METRICS_DATA, metrics: getMetrics });
  }, [dispatch]);

  const [result] = useQuery({ query });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (!data) return;

    const { getMetrics = [] } = data || {};

    getMetricsData(getMetrics);
  }, [getMetricsData, data]);

  if (fetching) {
    return (
      <div className={classes.progressBarContainer}>
        <CircularProgress className={classes.progress} />
        <Typography variant="h6" component="span">
          Fetching Metrics data ...
        </Typography>
      </div>
    );
  }

  if (error) {
    toast.error('Service Error!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    return (
      <Typography variant="h6" component="span" className={classes.errorContainer}>
        There is something wrong with the Metrics Service. Please try again after some time.
      </Typography>
    );
  }

  return children;
};

export default GetMetricsData;
