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
    overflow: 'scroll',
    outline: 'none',
    minHeight: '250px',
  },
  firstGrid: {
    marginTop: 15,
  },
  pokeImg: {
    width: 150,
    height: 150,
  },
  pokeEvoImg: {
    width: 50,
    height: 50,
  },
  specialCheck: {
    color: "#0000ff",
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
    cbTypes: false,                  // Array String
    cbResistant: false,              // Array String
    attacks: false,                // Array PokemonAttack
    cbWeaknesses: false,               // Array String
    cbFleeRate: false,
    cbMaxCP: false,
    cbEvolutions: false,             // Array Pokemon
    evolutionRequirements: false,  // Array PokemonEvolutionRequirement
    cbMaxHP: false,
    cbImage: true,
    cbEvolutionImage: true,
    cbEvolutionId: false,
    cbEvolutionNumber: false,
    cbEvolutionName: false,
  });

  const [state, setState] = React.useState({
    cbId: false,
    cbNumber: true,
    cbName: true,
    cbImage: true,
    cbClassification: false,
    cbFleeRate: false,
    cbMaxCP: false,
    cbMaxHP: false,
    cbTypes: false,
    cbResistant: false,
    cbWeaknesses: false,
    cbEvolutions: false,
    cbEvolutionImage: true,
    cbEvolutionId: false,
    cbEvolutionNumber: false,
    cbEvolutionName: false,
  });

  const [stringQuery, setStringQuery] = useState(`{\n  pokemons(first: 60) {\n\tnumber,\n\tname,\n\timage,\n  }\n}`);

  function createQuery() {
    let newQuery = `{\n  pokemons(first: 60) {\n`;
    (query.cbId !== false ? newQuery = newQuery.concat("\tid,\n") : newQuery = newQuery.concat(""));
    (query.cbNumber !== false ? newQuery = newQuery.concat("\tnumber,\n") : newQuery = newQuery.concat(""));
    (query.cbName !== false ? newQuery = newQuery.concat("\tname,\n") : newQuery = newQuery.concat(""));
    (query.cbClassification !== false ? newQuery = newQuery.concat("\tclassification,\n") : newQuery = newQuery.concat(""));
    (query.cbFleeRate !== false ? newQuery = newQuery.concat("\tfleeRate,\n") : newQuery = newQuery.concat(""));
    (query.cbMaxCP !== false ? newQuery = newQuery.concat("\tmaxCP,\n") : newQuery = newQuery.concat(""));
    (query.cbMaxHP !== false ? newQuery = newQuery.concat("\tmaxHP,\n") : newQuery = newQuery.concat(""));
    (query.cbTypes !== false ? newQuery = newQuery.concat("\ttypes,\n") : newQuery = newQuery.concat(""));
    (query.cbResistant !== false ? newQuery = newQuery.concat("\tresistant,\n") : newQuery = newQuery.concat(""));
    (query.cbWeaknesses !== false ? newQuery = newQuery.concat("\tweaknesses,\n") : newQuery = newQuery.concat(""));
    (query.cbImage !== false ? newQuery = newQuery.concat("\timage,\n") : newQuery = newQuery.concat(""));

    if(query.cbEvolutions !== false) {
      newQuery = newQuery.concat(`\tevolutions {\n`);
      (query.cbEvolutionId !== false ? newQuery = newQuery.concat("\t\tid,\n") : newQuery = newQuery.concat(""));
      (query.cbEvolutionNumber !== false ? newQuery = newQuery.concat("\t\tnumber,\n") : newQuery = newQuery.concat(""));
      (query.cbEvolutionName !== false ? newQuery = newQuery.concat("\t\tname,\n") : newQuery = newQuery.concat(""));
      (query.cbEvolutionImage !== false ? newQuery = newQuery.concat("\t\timage,\n") : newQuery = newQuery.concat(""));
      newQuery = newQuery.concat(`\t}\n`)
    }

    newQuery = newQuery.concat(`  }\n}`);

    setStringQuery(newQuery);

    //console.log(newQuery.toString());
    //console.log(newQuery);
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

  const GET_POKEMON_INFO = gql(stringQuery);
  const {data, loading, error} = useQuery(GET_POKEMON_INFO);

  function isOneCheckedQuery1() {
    let checked = 0;
    if (state.cbId) 
      checked += 1;
    if (state.cbNumber) 
      checked += 1;
    if (state.cbName) 
      checked += 1;
    if (state.cbImage) 
      checked += 1;
    if (state.cbFleeRate) 
      checked += 1;
    if (state.cbMaxCP) 
      checked += 1;
    if (state.cbMaxHP) 
      checked += 1;
    if (state.cbTypes) 
      checked += 1;
    if (state.cbResistant) 
      checked += 1;
    if (state.cbWeaknesses) 
      checked += 1;

    if (checked > 1) {
      return true;
    } else {
      return false;
    }
  }

  function isOneCheckedQuery2() {
    let checked = 0;
    if (state.cbEvolutionId) 
      checked += 1;
    if (state.cbEvolutionNumber) 
      checked += 1;
    if (state.cbEvolutionName) 
      checked += 1;
    if (state.cbEvolutionImage) 
      checked += 1;

    if (checked > 1) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (event) => {
    if (!event.target.checked) {
      if (event.target.name === "cbEvolutionId" ||event.target.name === "cbEvolutionNumber" ||
          event.target.name === "cbEvolutionImage" ||event.target.name === "cbEvolutionName" ) {
            if (!isOneCheckedQuery2()) {
              return alert("GraphQL needs at least one variable in the Evolutions Query!")
            }    
      } else {
        if (!isOneCheckedQuery1()) {
          return alert("GraphQL needs at least one variable in the query!")
        }
      }
    }
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
            <Grid item xs={12} sm={12}>

            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper2}>
                <Typography variant="body1">Pokemon Attributes</Typography>
                <Divider orientation="horizontal" />
                <Grid item container justify="space-between">
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

                <FormControlLabel
                  control={<Checkbox checked={state.cbClassification} onChange={handleChange} name="cbClassification" />}
                  label="Classification"
                />

                <FormControlLabel
                  control={<Checkbox checked={state.cbFleeRate} onChange={handleChange} name="cbFleeRate" />}
                  label="Flee Rate"
                />

                <FormControlLabel
                  control={<Checkbox checked={state.cbMaxCP} onChange={handleChange} name="cbMaxCP" />}
                  label="Max CP"
                />

                <FormControlLabel
                  control={<Checkbox checked={state.cbMaxHP} onChange={handleChange} name="cbMaxHP" />}
                  label="Max HP"
                />

                <FormControlLabel
                  control={<Checkbox checked={state.cbTypes} onChange={handleChange} name="cbTypes" />}
                  label="Types"
                />                
                
              <FormControlLabel
                control={<Checkbox checked={state.cbResistant} onChange={handleChange} name="cbResistant" />}
                label="Resistant"
              />                
            
              <FormControlLabel
                control={<Checkbox checked={state.cbWeaknesses} onChange={handleChange} name="cbWeaknesses" />}
                label="Weaknesses"
              /> 

              <FormControlLabel
                className={classes.specialCheck}
                control={<Checkbox className={classes.specialCheck} checked={state.cbEvolutions} onChange={handleChange} name="cbEvolutions" />}
                label="Evolutions"
              />
              </Grid>
              </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Paper className={classes.paper2}>
              <Typography variant="body1">Pokemon Evolutions</Typography>
              <Divider orientation="horizontal" />
              <FormControlLabel
                control={<Checkbox checked={state.cbEvolutionId} disabled={!state.cbEvolutions} onChange={handleChange} name="cbEvolutionId" />}
                label="ID"
              />

              <FormControlLabel
                control={<Checkbox checked={state.cbEvolutionNumber} disabled={!state.cbEvolutions} onChange={handleChange} name="cbEvolutionNumber" />}
                label="Number"
              />

              <FormControlLabel
                control={<Checkbox checked={state.cbEvolutionName} disabled={!state.cbEvolutions} onChange={handleChange} name="cbEvolutionName" />}
                label="Name"
              />

              <FormControlLabel
                control={<Checkbox checked={state.cbEvolutionImage} disabled={!state.cbEvolutions} onChange={handleChange} name="cbEvolutionImage" />}
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
            <Box pt={1}>
              <Grid container item alignItems="center" justify="center">
              Try that query in the official Graphql server: <a href="https://graphql-pokemon.now.sh" target="_blank">https://graphql-pokemon.now.sh</a>
              </Grid> 
            </Box>
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
                {pokemon.id ? <Typography><b>ID:</b> {pokemon.id}</Typography> : null}
                {pokemon.number ? <Typography><b>Number:</b> {pokemon.number}</Typography> : null}
                {pokemon.name ? <Typography><b>Name:</b> {pokemon.name}</Typography> : null}
                {pokemon.weight ? <Typography><b>Weight:</b> {pokemon.weight}</Typography> : null}
                {pokemon.height ? <Typography><b>Height:</b> {pokemon.height}</Typography> : null}
                {pokemon.classification ? <Typography><b>Classification:</b> {pokemon.classification}</Typography> : null}
                {pokemon.fleeRate ? <Typography><b>Flee Rate:</b> {(pokemon.fleeRate*100).toFixed(2)}% </Typography> : null}
                {pokemon.maxCP ? <Typography><b>Max CP:</b> {pokemon.maxCP}</Typography> : null}
                {pokemon.maxHP ? <Typography><b>Max HP:</b> {pokemon.maxHP}</Typography> : null}
                {pokemon.types ? <Typography><b>Types:</b> {pokemon.types.toString()} </Typography> : null}
                {pokemon.resistant ? <Typography><b>Resistant:</b> {pokemon.resistant.toString()} </Typography> : null}
                {pokemon.weaknesses ? <Typography><b>Weaknesses:</b> {pokemon.weaknesses.toString()} </Typography> : null}
                {pokemon.evolutions ? pokemon.evolutions.map((pokemonEvo,index) => (
                  <div key={index}>
                    <Box pt={1} pb={1}>
                    <Divider orientation="horizontal" />
                    </Box>
                    <Typography><b>Evolutions:</b></Typography>
                    {pokemonEvo.image ? <img src={pokemonEvo.image} className={classes.pokeEvoImg} alt="Pokemon Evolution"/> : null}
                    {pokemonEvo.id ? <Typography variant="body2"><b>ID:</b> {pokemonEvo.id}</Typography> : null}
                    {pokemonEvo.number ? <Typography variant="body2"><b>Number:</b> {pokemonEvo.number}</Typography> : null}
                    {pokemonEvo.name ? <Typography variant="body2"><b>Name:</b> {pokemonEvo.name}</Typography> : null}
                  </div>
                )) : null}
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
          <textarea wrap="off" readOnly className={classes.customArea} value={data ? data.pokemons ? `{"pokemons":[\n` + data.pokemons.map((pokemon,index) => (JSON.stringify(pokemon)+"\n")) + "]}" : "" : ""}></textarea>
        </Paper>
      </Grid>
    </Grid>
    </Grid>
    </div>
  );
}

export default App;
