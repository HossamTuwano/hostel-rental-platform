import {
  GET_ACCOMMODATIONS,
  GET_SINGLE_ACCOMMODATIONS,
  ADD_ACCOMMODATION,
  DELETE_ACCOMMODATION,
  ACCOMMODATIONS_LOADING,
  SEARCH_ACCOMMODATIONS,
} from "../actions/types";

const initialState = {
  accommodations: [],
  loading: false,
};

export default function accommodationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: action.payload,
        loading: false,
      };
    case GET_SINGLE_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: action.payload,
        loading: false,
      };
    case SEARCH_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: action.payload,
        loading: false,
      };
    case DELETE_ACCOMMODATION:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ADD_ACCOMMODATION:
      return {
        ...state,
        accommodations: [action.payload, ...state.accommodations],
      };
    case ACCOMMODATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
