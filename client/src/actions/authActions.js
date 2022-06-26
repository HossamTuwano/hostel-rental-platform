import axios from "axios";
import { login_api, reset, new_password } from "../API";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./types";

// Check token and load user

// Login user

export const login =
  ({ email, password }) =>
  (dispatch) => {
    // header
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ email, password });

    axios
      .post(login_api, body, config)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };
export const resetPassword =
  ({ email }) =>
  (dispatch) => {
    // header
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ email });

    axios
      .post(reset, body, config)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };
export const newPassword =
  ({ password, token }) =>
  (dispatch) => {
    // header
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ password, token });

    axios
      .post(new_password, body, config)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

// Register User

export const register =
  ({ name, email, phone, password }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body

    const body = JSON.stringify({
      name,
      email,
      phone,
      password,
    });

    axios
      .post("/api/register", body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
// Setup config/headers and token
export const tokenConfig = (getState) => {
  //   get the token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   if token add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
