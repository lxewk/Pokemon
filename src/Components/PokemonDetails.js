import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledPokemon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 3px solid crimson;
    margin: 25px;
    font-size: large;
    color: rgb(34, 4, 61);
    width: 200px;
    padding: 25px;
`;

const Pokemon = (props) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [error, setError] = useState(null);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            try {
                const result = await axios.get(props.url);
                setPokemonDetail(result.data);
                toggleLoading(false);
            } catch(error) {
                setError(error);
                toggleLoading(false);
            }
        }
        fetchData();
    },[]);

        return(
            <StyledPokemon>
                {error !== null && <p>Er is iets mis gegaan: {error}</p>}
                {loading === true && <p>Loading...</p>}

                {pokemonDetail !== null &&
                    <>
                        <h3>{ pokemonDetail.name }</h3>

                        <img 
                            src={pokemonDetail.sprites.front_default}
                            alt={pokemonDetail.name} 
                        />

                        <h3>Abilities:</h3>
                        <ul>
                            {pokemonDetail.abilities.map((entry) => {
                                return(
                                    <li key={entry.ability.name}>
                                        { entry.ability.name }
                                    </li>
                                )
                            })}
                            {/* <li>{ pokemonDetail.abilities[0].ability.name }</li>
                            <li>{ pokemonDetail.abilities[1].ability.name }</li>
                            <li>{ pokemonDetail.abilities[2].ability.name }</li> */}
                        </ul>

                        <h3>Weight:</h3>
                        <p>{ pokemonDetail.weight }</p>

                        <h3>Moves:</h3>
                        <p>{ pokemonDetail.moves.length }</p>
                    </>
                }
            </StyledPokemon>
            
        );
}

export default Pokemon;