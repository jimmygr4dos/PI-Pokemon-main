import React from "react";
import { Link } from "react-router-dom";
import "./CreatePokemonButton.css";

function CreatePokemonButton() {
  
    return (
        <>
        <Link to={`/create`} className="createPokemon">
            <button key='createPokemon' id='createPokemon'>
                Create Your Pokemon!
            </button>
        </Link>
        </>
    );
}

export default React.memo(CreatePokemonButton)