import { GET_BOOKING } from "../actions/types";

const initialState = {
  status: "",
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKING:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
