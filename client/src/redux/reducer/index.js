import {GET_POKEMONS, GET_POKEMON_BY_ID, 
  GET_POKEMON_BY_NAME, FILTER_POKEMONS_BY_TYPES, 
  GET_TYPES,
  SORT_POKEMONS_BY_NAME,
  SORT_POKEMONS_BY_ATTACK,
  APPLY_FILTERS, FILTER_BY_ORIGIN
  } from "../actions/constants";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: {},
  filterByType: '',
  sortByAttack: '',
  sortByName: '',
  filterByOrigin: '',
  loading: true
};

  function rootReducer(state = initialState, action) {
    
    switch (action.type) {
    case GET_POKEMONS:
      return {...state, pokemons: action.payload, allPokemons: action.payload, loading: false};
    case GET_TYPES:
      return {...state, types: action.payload};
    case GET_POKEMON_BY_ID:
      return {...state, detail: action.payload};
    case GET_POKEMON_BY_NAME:
      return {...state, pokemons: action.payload};
    case FILTER_POKEMONS_BY_TYPES:
      return {...state, filterByType: action.payload}
    case SORT_POKEMONS_BY_NAME:
      return {...state, sortByName: action.payload}
    case SORT_POKEMONS_BY_ATTACK:
      return {...state, sortByAttack: action.payload}
    case FILTER_BY_ORIGIN:
      return {...state, filterByOrigin: action.payload}
    case APPLY_FILTERS:
      
      let filtered = [...state.allPokemons];

      //Sort By Name
      const paramSortByName = state.sortByName;
      if (paramSortByName.length > 0 && paramSortByName !== 'none') {
        if (paramSortByName === 'asc') {
          filtered.sort((a, b) => {
            if (a.name < b.name) {return -1;}
            if (a.name > b.name) {return 1;}
            return 0;
          })

        } else if (paramSortByName === 'desc') {
          filtered.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          })
        }
        console.log('filtered-SortByName: ', filtered)
      }

      //Filter By Origin
      const paramFilterByOrigin = state.filterByOrigin;
      if (paramFilterByOrigin.length > 0 && paramFilterByOrigin !== 'none') {
        if (paramFilterByOrigin === 'crt') {
          filtered = filtered.filter(p => p.created)
        } else if (paramFilterByOrigin === 'ext') {
          filtered = filtered.filter(p => !p.created)
        }
      }
      
      //Filter By Type
      const paramFilterByType = state.filterByType;
      if (paramFilterByType.length > 0 && paramFilterByType !== 'none') {
        if (paramFilterByType === 'all') {
          filtered = filtered;
        } else {
          filtered = filtered.filter(p => p.types.includes(paramFilterByType));
        }
      }

      // Sort By Attack
      const paramSortByAttack = state.sortByAttack;
      if (paramSortByAttack.length > 0 && paramSortByAttack !== 'none') {
        if (paramSortByAttack === 'asc') {
          console.log('paramSortByAttack-ASC: ', paramSortByAttack);
          filtered.sort((a, b) => {
            if (a.attack > b.attack) return 1;
            if (a.attack < b.attack) return -1;
            return 0;
          })
        } else if (paramSortByAttack === 'desc') {
          console.log('paramSortByAttack-DESC: ', paramSortByAttack);
          filtered.sort((a, b) => {
            if (a.attack < b.attack) return 1;
            if (a.attack > b.attack) return -1;
            return 0;
          })
        }
        console.log('filtered-SortByAttack: ', filtered);
      }

      return {...state, pokemons: filtered};

    default:
      return state;
  }
  
}

export default rootReducer;