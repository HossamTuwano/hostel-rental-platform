import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import accommodationReducer from "./accommodationReducer";
import bookingReducer from "./bookingReducer";
export default combineReducers({
  accommodation: accommodationReducer,
  error: errorReducer,
  auth: authReducer,
  booking: bookingReducer,
});
