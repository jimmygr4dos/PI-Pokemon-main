import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../../redux/actions/";
import "./SearchBar.css";

function SearchBar() {
  
    const dispatch = useDispatch();
    
    const [namePokemon, setNamePokemon] = useState("");

    function handleChange(e) {
        e.preventDefault();
        setNamePokemon(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if (namePokemon) {
            dispatch(getPokemonByName(namePokemon));
            setNamePokemon("");
        }
    }

    return (
        <>
            <input type="text" placeholder="Search by name" id='namePokemon' 
            value={namePokemon} onChange={(e) => handleChange(e)}/>
            <span>&nbsp;</span>
            <button onClick={(e) => handleSubmit(e)} type="submit" disabled={!namePokemon} >Search</button>
        </>
    );
}

export default React.memo(SearchBar)