import {GET_POKEMONS, GET_POKEMON_BY_ID, 
        GET_POKEMON_BY_NAME, FILTER_POKEMONS_BY_TYPES, 
        POKEMONS_LOADING, TRUNCATE_POKEMONS, GET_TYPES,
        SORT_POKEMONS_BY_NAME,
        SORT_POKEMONS_BY_ATTACK
        } from "../actions/constants";

const initialState = {
  pokemons: [],
  allPokemons: [],
  loading: false,
  types: [],
  detail: {},
  searchBarMessage: {'sucess': false, 'data': {}}
};

function pokemons(state = initialState, action) {

  switch (action.type) {
    case ERROR_MESSAGE_SEARCH_BAR:
      return {...state, searchBarMessage: action.payload}
    case POKEMONS_LOADING:
      return {...state, loading: action.payload};
    case GET_POKEMONS:
      // console.log('GET_POKEMONS: ', action.payload);
      return {...state, pokemons: action.payload, allPokemons: action.payload, loading: false};
    case GET_TYPES:
      // console.log('GET_TYPES: ', action.payload);
      return {...state, types: action.payload};
    case GET_POKEMON_BY_ID:
      return {...state, detail: action.payload};
    case GET_POKEMON_BY_NAME:
      return {...state, pokemons: action.payload, loading: false};
    case FILTER_POKEMONS_BY_TYPES:
      // console.log('pokemons: ', state.pokemons.filter((p) => p.types.includes(action.payload)));
      const allPokemons = state.allPokemons;
      const filter =  (action.payload === 'none' || action.payload === 'all') ? 
                        allPokemons : 
                        allPokemons.filter((p) => p.types.includes(action.payload))
      // return {...state, pokemons: state.pokemons.filter((p) => p.types.includes(action.payload)) };
      return {...state, pokemons: filter, loading: false};
    case SORT_POKEMONS_BY_NAME:
      const sortByName = state.pokemons;
      if (action.payload === 'asc') {
        sortByName.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
      } else if (action.payload === 'desc') {
        sortByName.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        })
      }
      return {...state, pokemons: sortByName, loading: false};
      case SORT_POKEMONS_BY_ATTACK:
        const sortByAttack = state.pokemons;
        if (action.payload === 'asc') {
          sortByAttack.sort((a, b) => {
            if (a.attack > b.attack) return 1;
            if (a.attack < b.attack) return -1;
            return 0;
          })
        } else if (action.payload === 'desc') {
          sortByAttack.sort((a, b) => {
            if (a.attack < b.attack) return 1;
            if (a.attack > b.attack) return -1;
            return 0;
          })
        }
        console.log('sortByAttack: ', sortByAttack)
        return {...state, pokemons: sortByAttack, loading: false};
      default:
      return state;
  }

}

export default pokemons;