import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    // .then((res) => history.push("/dashboard"))
    .then((res) => {
      // Save Token to Local Storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //Set Token to authHeader
      setAuthToken(token);

      // Decode Token to get user Data
      const decode = jwt_decode(token);

      // Set Current User
      dispatch(setCurrentUser(decode));

      // REDIRECT TO DASHBOARD
      history.push("/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Setting User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save Token to Local Storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //Set Token to authHeader
      setAuthToken(token);

      // Decode Token to get user Data
      const decode = jwt_decode(token);

      // Set Current User
      dispatch(setCurrentUser(decode));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// SET current User
export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// Logout User

export const logoutUser = () => (dispatch) => {
  // Remove Token from LocalStorage
  localStorage.removeItem("jwtToken");

  // remove Auth from Header
  setAuthToken(false);

  // Remove user from Redux Auth
  dispatch(setCurrentUser({}));
};
