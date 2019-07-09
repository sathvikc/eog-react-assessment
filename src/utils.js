import moment from 'moment';

export const convertTimestampToTime = timestamp => moment(timestamp).format('hh:mm a');

export const titleCase = stringArray => stringArray.map(string => (
  string[0].toUpperCase() + string.slice(1, string.length).toLowerCase()
));

export const getMetricLabelName = (metricName) => {
  const nameArray = metricName.split(/(?=[A-Z])/);

  return titleCase(nameArray).join(' ');
};

export const getThirtyMinutesBeforeTimestamp = () => new Date() - 30 * 60 * 1000;
