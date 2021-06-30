import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateReturn = (userData, history) => dispatch => {
  axios
    .post("/api/updReturn", userData.body, {params:userData.params})
    .then(res => {
      console.log("updated");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const deleteReturn = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delReturn", {params:userData})
    .then(res => history.push("/investments"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllReturns = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getReturns", {params:userData})
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

export const registerReturn = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newReturn", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/returns"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
