import React, { useState, useEffect } from 'react';
import Pokemon from './Components/PokemonDetails';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: auto;
`;

function App() {
  const [pokemonResource, setPokemonResource] = useState(null);

  useEffect(()=> {
    const fetchData = async () => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon');   
      setPokemonResource(result.data);
      } 
      fetchData();
  },[]);
  

  return (
    <>
      <StyledContainer>
        {pokemonResource !== null &&
          <div>
            {pokemonResource.results.map((entry) => {
              return(
                <div key={entry.Pokemon}>
                  <Pokemon url={entry.url}/>
                </div> 
              )
            })}
          </div>
        }
      </StyledContainer>
      {/* 
        <Pokemon url='https://pokeapi.co/api/v2/pokemon/jigglypuff' />

        <Pokemon url='https://pokeapi.co/api/v2/pokemon/ditto' />

        <Pokemon url='https://pokeapi.co/api/v2/pokemon/charmeleon' />
      </div> */}
    </>
  );
}

export default App;
