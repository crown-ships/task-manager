import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/", userData.body, {params:userData.params})
    .then(res => {
      console.log("updated");

     history.push("/users")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteUser = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/users", {params:userData})
    .then(res => history.push("/users"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllUsers = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/users", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

export const getFilteredUsers = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/filteredUsers", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

export const getUser = (userData, history) => {
  return function (dispatch) {
    console.log(userData);
    return axios
    .get("/api/user", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};
