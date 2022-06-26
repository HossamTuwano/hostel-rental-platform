import axios from "axios";
import {
  GET_ACCOMMODATIONS,
  ADD_ACCOMMODATION,
  GET_SINGLE_ACCOMMODATIONS,
  DELETE_ACCOMMODATION,
  ACCOMMODATIONS_LOADING,
  SEARCH_ACCOMMODATIONS,
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getAccommodations = () => (dispatch) => {
  dispatch(setAccommodationsLoading());
  axios
    .get("/admin/accommodations")
    .then((res) => {
      dispatch({ type: GET_ACCOMMODATIONS, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSingleAcc = async (_id, cbsf, cbef) => {
  try {
    const response = await fetch("/admin/get_single_accommodation/" + _id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    cbsf(data);
  } catch (error) {
    cbef(error);
  }
};

export const getSingleAccommodation = (_id) => (dispatch) => {
  dispatch(setAccommodationsLoading());
  axios
    .get("http://127.0.0.0:5000/admin/get_single_accommodation/" + _id)
    .then((res) => {
      dispatch({
        type: GET_ACCOMMODATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const get_single = (_id) => async (dispatch) => {
  // dispatch(setAccommodationsLoading())

  try {
    const response = await fetch(
      "http://127.0.0.0:5000/admin/get_single_accommodation/" + _id
    );

    const data = dispatch({
      type: GET_ACCOMMODATIONS,
      payload: await response.json(),
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const searchAccommodations = () => (dispatch) => {
  dispatch(setAccommodationsLoading());
  axios
    .get("/search/search_accommodation/")
    .then((res) => {
      dispatch({ type: SEARCH_ACCOMMODATIONS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addAccommodation = (accommodation) => (dispatch, getState) => {
  axios
    .post("/admin/add-accommodation", accommodation, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_ACCOMMODATION, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setAccommodationsLoading = () => {
  return {
    type: ACCOMMODATIONS_LOADING,
  };
};
