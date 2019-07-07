import React from 'react';
import { useSelector } from "react-redux";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardsContainer: {
    display: 'flex',
  },
  card: {
    'max-width': '200px',
    'flex-grow': 1,
    'margin-right': '10px',
    '&:last-child': {
      'margin-right': 0,
    },
  }
});

const Cards = (props) => {
  const classes = useStyles();

  const {selectedMetrics, metricsData} = props;

  // Get all measurements data from `measurements` reducer
  const measurementsData = useSelector((store) => {
    const { measurements } = store;

    return measurements;
  })

  return (
    <div className={classes.cardsContainer}>
      {
        Array.isArray(selectedMetrics) && selectedMetrics.map((card) => {
          const metricName = card;
          const labelName = metricsData[metricName];
          const measurementData = measurementsData[metricName];
          const measurementDataLength = measurementData.length;
          const metricValue = measurementData[measurementDataLength - 1].value;

          return (
            <Card key={metricName} className={classes.card}>
              <CardContent>
                <Typography variant="body2" component="h2">
                  {labelName}
                </Typography>
                <Typography variant="h5" component="p">
                  {metricValue}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      }
    </div>
  );
}

export default Cards;