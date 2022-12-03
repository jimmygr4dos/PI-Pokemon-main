import {GET_POKEMONS, GET_POKEMON_BY_NAME,
        GET_TYPES, FILTER_POKEMONS_BY_TYPES, 
        SORT_POKEMONS_BY_NAME, SORT_POKEMONS_BY_ATTACK,
        GET_POKEMON_BY_ID, APPLY_FILTERS, FILTER_BY_ORIGIN
      } from "./constants";

import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({type: GET_POKEMONS, payload: json.data,});
  };
};

    // if (fromSearchBar) {
      // dispatch({ type: POKEMONS_LOADING, payload: true });
      // dispatch({ type: SEARCHING_SEARCH_BAR, payload: '' });
    // }

    // dispatch({ type: POKEMONS_LOADING, payload: true });
    // dispatch({ type: ERROR_MESSAGE_SEARCH_BAR, payload: '' });


// export function getPokemons(fromSearchBar=false) {
//   return async function(dispatch) {

//     if (fromSearchBar) {
//       dispatch({ type: POKEMONS_LOADING, payload: true });
//       dispatch({ type: SEARCHING_SEARCH_BAR, payload: '' });
//     }
    
//     dispatch({ type: POKEMONS_LOADING, payload: true });
//     return await fetch(`http://localhost:3001/pokemons`)
//       .then(response => response.json())
//       .then(json => {
//         dispatch({ type: GET_POKEMONS, payload: json });
//         dispatch({ type: ERROR_MESSAGE_SEARCH_BAR, payload: '' });
//         // console.log('json getPokemons: ', json)
//       });
//   };
// }

export function getPokemonByName(namePokemon) {
  return (dispatch) => {
    return fetch(`http://localhost:3001/pokemons?name=${namePokemon}`)
      .then(response => response.json())
      .then(json => {
        // if (json.sucess) {
          dispatch({ type: GET_POKEMON_BY_NAME, payload: json.data });
        // }
        // else {
          // dispatch({ type: ERROR_MESSAGE_SEARCH_BAR, payload: json.data });
        // }
      })
      .catch((error) => {
        console.log(error)
        console.log('error: ', error)
      });
  };
}

export function getPokemonById(id) {
  return async function(dispatch) {
    let json = await axios.get(`http://localhost:3001/pokemons/${id}`)
    return dispatch({ type: GET_POKEMON_BY_ID, payload: json.data });
  };
};

// export function getPokemonById(id) {
//   return async function(dispatch) {
//     // dispatch({ type: POKEMONS_LOADING, payload: true });
//     return await fetch(`http://localhost:3001/pokemons/${id}`)
//       .then(response => response.json())
//       .then(json => {
//         dispatch({ type: GET_POKEMON_BY_ID, payload: json });
//         // console.log('json getPokemonById: ', json)
//       });
//   };
// }

export function getTypes() {
  return async (dispatch) => {
    let json = await axios.get(`http://localhost:3001/types`)
    return dispatch({ type: GET_TYPES, payload: json.data });
  };
};

// export function getTypes() {
//   return async (dispatch) => {
//       return await fetch(`http://localhost:3001/types`)
//       .then(response => response.json())
//       .then(json => {
//           dispatch({ type: GET_TYPES, payload: json });
//           // console.log('json getTypes: ', json)
//       })
//       .catch((error) => {
//           console.log(error)
//           console.log('error: ', error)
//       });
//   };
// }

export function filterByTypes(payload) {
  return {type: FILTER_POKEMONS_BY_TYPES, payload}
}

export function filterByOrigin(payload) {
  return {type: FILTER_BY_ORIGIN, payload}
}

export function sortByNames (payload) {
  return {type: SORT_POKEMONS_BY_NAME, payload}
}

export function sortByAttack (payload) {
  return {type: SORT_POKEMONS_BY_ATTACK, payload}
}

export function apllyFilters (payload) {
  return {type: APPLY_FILTERS, payload}
}

export function createPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pokemons", payload);
    return response;
  };
}