import React, {useState, useEffect} from 'react';
import { Grid, Paper, Typography, Divider, Box, FormControlLabel, Checkbox } from '@material-ui/core';
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
  const [query,setQuery] = useState({
    cbId: false,
    cbNumber: true,
    cbName: true,
    weight: false,                 // Array PokemonWeight
    height: false,                 // Array PokemonDimension
    cbClassification: false, 
    types: false,                  // Array String
    resistant: false,              // Array String
    attacks: false,                // Array PokemonAttack
    weakness: false,               // Array String
    cbFleeRate: false,
    cbMaxCP: false,
    evolutions: false,             // Array Pokemon
    evolutionRequirements: false,  // Array PokemonEvolutionRequirement
    cbMaxHP: false,
    cbImage: true,
  });
  const [onlyOne, setOnlyOne] = useState(false);

  const [state, setState] = React.useState({
    cbId: false,
    cbNumber: true,
    cbName: true,
    cbImage: true,
  });

  const [stringQuery, setStringQuery] = useState(`{\n  pokemons(first: 30) {\n\tnumber,\n\tname,\n\timage,\n  }\n}`);

  function createQuery() {
    let newQuery = `{\n  pokemons(first: 30) {\n`;
    (query.cbId !== false ? newQuery = newQuery.concat("\tid,\n") : newQuery = newQuery.concat(""));
    (query.cbNumber !== false ? newQuery = newQuery.concat("\tnumber,\n") : newQuery = newQuery.concat(""));
    (query.cbName !== false ? newQuery = newQuery.concat("\tname,\n") : newQuery = newQuery.concat(""));
    (query.cbClassification !== false ? newQuery = newQuery.concat("\tclassification,\n") : newQuery = newQuery.concat(""));
    (query.cbFleeRate !== false ? newQuery = newQuery.concat("\tfleeRate,\n") : newQuery = newQuery.concat(""));
    (query.cbMaxCP !== false ? newQuery = newQuery.concat("\tmaxCP,\n") : newQuery = newQuery.concat(""));
    (query.cbMaxHP !== false ? newQuery = newQuery.concat("\tmaxHP,\n") : newQuery = newQuery.concat(""));
    (query.cbImage !== false ? newQuery = newQuery.concat("\timage,\n") : newQuery = newQuery.concat(""));
    newQuery = newQuery.concat(`  }\n}`);

    setStringQuery(newQuery);

    console.log(newQuery.toString());
    console.log(query);
    return
  }

  /*
  const GET_POKEMON_INFO = gql(`
  {
    pokemons(first: 30) {
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
  */

  const GET_POKEMON_INFO = gql(`
  {
    pokemons(first: 30) {
      number,
      name,
      image,
    }
  }`);
  const {data, loading, error} = useQuery(GET_POKEMON_INFO);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setQuery({...query, [event.target.name]: event.target.checked})
  };

  useEffect(() => {
    createQuery();
  },[query]);

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
            <Grid container direction="row" spacing={2}>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper2}>
                <Typography variant="body1">Pokemon Attributes</Typography>
                <FormControlLabel
                  control={<Checkbox checked={state.cbId} onChange={handleChange} name="cbId" />}
                  label="ID"
                />
                <FormControlLabel
                  control={<Checkbox checked={state.cbNumber} onChange={handleChange} name="cbNumber" />}
                  label="Number"
                />
                <FormControlLabel
                  control={<Checkbox checked={state.cbName} onChange={handleChange} name="cbName" />}
                  label="Name"
                />
                
                <FormControlLabel
                  control={<Checkbox checked={state.cbImage} onChange={handleChange} name="cbImage" />}
                  label="Image"
                />
              </Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
              <Paper className={classes.paper2}>
              <Typography variant="body1">Evolution Attributes</Typography>
              <FormControlLabel
                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="ID"
              />
              <FormControlLabel
                control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                label="Number"
              />
              <FormControlLabel
                control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
                label="Name"
              />
              <FormControlLabel
                control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
                label="Image"
              />
              </Paper>
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
            <textarea readOnly className={classes.customArea} value={stringQuery}></textarea>
          </Paper>
        </Grid>
            { console.log(data) }
            { loading ? <p>Loading...</p> : null}
            { error ? <p>{error}</p> : null }
            { data ?
              data.pokemons ?
              data.pokemons.map((pokemon,index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Paper className={classes.paper2}>
                {pokemon.image ? <img src={pokemon.image} className={classes.pokeImg} alt="Pokemon"/> : null}
                {pokemon.id ? <Typography>ID: {pokemon.id}</Typography> : null}
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
      <Grid item xs={12} sm={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Returned Data from Server</Typography>
          <Box p={2}>
            <Divider orientation="horizontal" />
          </Box>
          <textarea readOnly className={classes.customArea} value={data ? data.pokemons ? `{"pokemons":[\n` + data.pokemons.map((pokemon,index) => (JSON.stringify(pokemon)+"\n")) + "]}" : "" : ""}></textarea>
        </Paper>
      </Grid>
    </Grid>
    </Grid>
    </div>
  );
}

export default App;
