import React from "react";
import Card from "../Card/Card";
import "./CardsContainer.css";
import bouncingPokeball from "../../img/bouncingPokeball.gif"

const CardsContainer = ({ pokemons, loading }) => {
    // const { pokemons } = props;

    return (
        <>
                {
                
                loading ?
                <div className="loading">
                    <div className="loading-img">
                        <img src={bouncingPokeball} key={bouncingPokeball} alt={bouncingPokeball}/>
                    </div>
                    <div className="loading-text">
                        <span>Loading, please wait...</span>
                    </div>
                </div>
                :
                
                (Array.isArray(pokemons) && pokemons.length > 0) ?
                    <div className='cardsContainer'>
                        {pokemons.map((pokemon) => (
                                <Card
                                key={pokemon.id}
                                id={pokemon.id}
                                image={pokemon.image}
                                name={pokemon.name}
                                types={pokemon.types}
                                created={pokemon.created}
                                />
                        ))}
                    </div>
                :
                
                ((Array.isArray(pokemons)) && (pokemons.length === 0)) ?
                <div>pokemon not found</div>
                :
                // ((Array.isArray(pokemons)) && (pokemons.length > 0) && (typeof pokemons[0] === 'string')) ? 
                    <div>{pokemons}</div>
            }

            
        </>
    )
};

export default CardsContainer;
