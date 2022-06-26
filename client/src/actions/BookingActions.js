import axios from "axios";
import { update_status } from "../API";
import { GET_BOOKING } from "./types";

export const booking =
  ({ id, stuid }) =>
  (dispatch) => {
    // header
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ id, stuid });

    axios
      .post(update_status, body, config)
      .then((res) => dispatch({ type: GET_BOOKING, payload: res.data }));
  };
