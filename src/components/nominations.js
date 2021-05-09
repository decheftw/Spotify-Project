/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import NullImage from '../NullImage.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function NomsList(props) {
  const classes = useStyles();
  const [rating, setRating] = useState('No Rating Found');
  console.log(props);
  let {
    // eslint-disable-next-line prefer-const
    title, poster, year, id, noms, setNoms,
  } = props;
  if (poster === 'N/A') {
    poster = NullImage;
  }

  function buttonOnClick() {
    const tempNoms = [...noms];
    let i = 0;
    for (i; i < tempNoms.length; i += 1) {
      if (tempNoms[i].id === id) {
        tempNoms.splice(i, 1);
      }
    }
    setNoms(tempNoms);
  }

  useEffect(() => {
    console.log(rating[0]);
  }, [rating]);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=948f4b34`)
      .then((response) => {
        if (response.data.Ratings.length > 0) {
          setRating(response.data.Ratings[0].Value);
        }
      });
  }, [id]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt="complex" src={poster} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {rating}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={buttonOnClick}>Remove</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
