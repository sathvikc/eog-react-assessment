import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import { convertTimestampToTime } from '../../utils';

const colors = [
  '#bb83bf',
  '#3766df',
  '#d4ea54',
  '#e05661',
  '#6fba50',
  '#b17631',
];

const useStyles = makeStyles(theme => ({
  progressBarContainer: {
    margin: '10px',
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const tickFormatter = tick => convertTimestampToTime(tick);

const Chart = (props) => {
  const { data } = props;
  const classes = useStyles();

  if (!data) {
    return (
      <div className={classes.progressBarContainer}>
        <CircularProgress className={classes.progress} />
        <Typography variant="h6" component="span">
          Loading Chart with selected Metric...
        </Typography>
      </div>
    );
  }

  return (
    <ResponsiveContainer>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="at"
          type="number"
          scale="time"
          interval="preserveEnd"
          tickFormatter={tickFormatter}
          domain={['dataMin', 'dataMax']}
        />
        {
          data.map(s => (
            <YAxis key={s.name} yAxisId={s.unit} dataKey="value" label={{ value: s.unit, angle: -90, position: 'insideLeft' }} />
          ))
        }

        <Tooltip labelFormatter={tickFormatter} />

        {
          data.map((s, inx) => (
            <Line dataKey="value" yAxisId={s.unit} stroke={colors[inx]} data={s.data} name={s.label} key={s.name} />
          ))
        }
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
