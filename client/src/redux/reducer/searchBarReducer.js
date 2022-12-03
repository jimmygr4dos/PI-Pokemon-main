import {ERROR_MESSAGE_SEARCH_BAR, SEARCHING_SEARCH_BAR} from "../actions/constants";

const initialState = {
    error: '',
    searching: false
};

const searchBar = (state = initialState, action) => {

  switch (action.type) {
    case ERROR_MESSAGE_SEARCH_BAR:
      return {...state, searching:false, error: action.payload};
    case SEARCHING_SEARCH_BAR:
      return {...state, searching: true, error: ''};
    default:
      return state;
  }

}

export default searchBar;