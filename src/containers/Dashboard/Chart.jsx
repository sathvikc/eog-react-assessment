import React from 'react';

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
  '#b17631'
];

const tickFormatter = (tick) => convertTimestampToTime(tick);

const Chart = (props) => {
  const {data} = props;

  if(!data) return 'Loading Chart with selected Metric...';

  return (
    <ResponsiveContainer>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis 
          dataKey='at' 
          type='number' 
          scale='time'
          interval="preserveEnd" 
          tickFormatter={tickFormatter} 
          domain={['dataMin', 'dataMax']} />
        {
          data.map(s => (
            <YAxis key={s.name} yAxisId={s.unit} dataKey="value" label={{ value: s.unit, angle: -90, position: 'insideLeft'}} />
          ))
        }

        <Tooltip labelFormatter={tickFormatter}  />

        {
          data.map((s, inx) => (
            <Line dataKey="value" yAxisId={s.unit} stroke={colors[inx]} data={s.data} name={s.label} key={s.name} />
          ))
        }
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;