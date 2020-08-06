import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Field from './Components/Field';
import PokiName from './Components/PokiName';
import Picture from './Components/PokiPict';
import './App.css';


function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon/jigglypuff');
        setPokemonData(result.data);
        setLoading(false);
      } catch(error) {
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="pokemon-container">
        <PokiName text="Jigglypuff"/>
        {loading === true &&
        <p>Loading...</p>
        }
        {pokemonData !== null &&
          <Picture src={pokemonData.sprites.front_shiny}/>
        }
      </div>

      <div>
        <Header text="Abilities"/>
        <Field />
        
      </div>

      <div>
        <Header text="Weight"/>
        <Field />
      </div>

      <div>
        <Header text="Moves"/>
        <Field />
      </div>  
    </>
  );
}

export default App;
