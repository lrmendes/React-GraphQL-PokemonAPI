import React from 'react';
import { Grid, Paper, Typography, Divider, Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: '#f2f2f2',
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  customArea: {
    width: '100%',
    resize: 'none',
    background: 'linear-gradient(45deg, #3B3B3B 30%, #515151 90%)',
    borderRadius: 10,
    color: '#ffffff',
    minHeight: '250px',
  },
  firstGrid: {
    marginTop: 15,
  },
  pokeImg: {
    width: 150,
    height: 150,
  }
}));

function App() {
  const GET_POKEMON_INFO = gql(`
  {
      pokemons(first: 151) {
        id
        number
        name,
        image,
        evolutions {
          id,
          number,
          name,
          image
        }
      }
    }`);

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  const classes = styles();

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Grid container justify="center" className={classes.firstGrid}>
    <Grid container item xs={11} className={classes.maingrid} spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Search Control for API</Typography>
            <Box p={2}>
              <Divider orientation="horizontal" />
            </Box>
            <Typography variant="body1">Search Term 1</Typography>
            <Grid container>
              <Grid item>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5">GraphQL Query</Typography>
            <Box p={2}>
              <Divider orientation="horizontal" />
            </Box>
            <textarea readOnly className={classes.customArea} value={GET_POKEMON_INFO.loc.source.body}></textarea>
          </Paper>
        </Grid>
            { loading ? <p>Loading...</p> : null}
            { error ? <p>{error}</p> : null }
            { data ?
              data.pokemons ?
              data.pokemons.map((pokemon,index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Paper className={classes.paper2}>
                {pokemon.image ? <img src={pokemon.image} className={classes.pokeImg} alt="Pokemon"/> : null}
                {pokemon.number ? <Typography>Number: {pokemon.number}</Typography> : null}
                {pokemon.name ? <Typography>Name: {pokemon.name}</Typography> : null}
                {pokemon.weight ? <Typography>Weight: {pokemon.weight}</Typography> : null}
                {pokemon.height ? <Typography>Height: {pokemon.height}</Typography> : null}
                {pokemon.classification ? <Typography>Classification: {pokemon.classification}</Typography> : null}
                </Paper>
              </Grid>
              ))
              : null
              : null
            }
    </Grid>
    </Grid>
    </div>
  );
}

export default App;
