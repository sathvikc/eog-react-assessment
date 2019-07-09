import React from 'react';

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
  },
});

const Cards = (props) => {
  const classes = useStyles();

  const { cardsData } = props;

  return (
    <div className={classes.cardsContainer}>
      {
        cardsData.map((card) => {
          const { id, label, value } = card;
          return (
            <Card key={id} className={classes.card}>
              <CardContent>
                <Typography variant="body2" component="h2">
                  {label}
                </Typography>
                <Typography variant="h5" component="p">
                  {value}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      }
    </div>
  );
};

export default Cards;
