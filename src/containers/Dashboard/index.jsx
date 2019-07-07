import React, { Fragment, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Metrics from './Metrics';

const mockChartData = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const useStyles = makeStyles({
  dashboardContainer: {
    margin: '10px',
  },
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

const Dashboard = () => {
  const classes = useStyles();

  const [state, setState] = useState({});

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

        {/* Cards */}
        <div className={classes.cardsContainer}>
          {
            Array.isArray(selectedMetrics) && selectedMetrics.map((card) => {
              const metricName = card;
              const metricLabelName = metricsData[metricName];

              return (
                <Card key={metricName} className={classes.card}>
                  <CardContent>
                    <Typography variant="body2" component="h2">
                      {metricLabelName}
                    </Typography>
                    <Typography variant="h5" component="p">
                      108.92
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          }
        </div>
      </div>

      {/* Chart */}
      {
        Array.isArray(selectedMetrics) && selectedMetrics.length ? (
          <ResponsiveContainer>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" />
              <Tooltip/>
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          ''
        )
      }
    </Fragment>
  );
}

export default Dashboard;