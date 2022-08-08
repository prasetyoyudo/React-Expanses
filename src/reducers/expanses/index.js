import { ADD_EXPANSES, GET_LIST_EXPANSES } from "../../actions/expanses";

const initialState = {
  getListExpansesRes: false,
  getListExpansesLoading: false,
  getListExpansesError: false,

  addExpansesResult: false,
  addExpansesLoading: false,
  addExpansesError: false,
};

const expanses = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_EXPANSES:
      return {
        ...state,
        getListExpansesRes: action.payload.data,
        getListExpansesLoading: action.payload.loading,
        getListExpansesError: action.payload.errorMessage,
      };
    case ADD_EXPANSES:
      return {
        ...state,
        addExpansesResult: action.payload.data,
        addExpansesLoading: action.payload.loading,
        addExpansesError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default expanses;
