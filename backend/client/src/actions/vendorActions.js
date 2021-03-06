import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};


export const getFilteredVendors = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getFilteredVendors", {params:userData})
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


export const updateVendor = (userData, history) => dispatch => {
  axios
    .post("/api/updVendor", userData.body, {params:userData.params})
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

export const deleteVendor = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delVendor", {params:userData})
    .then(res => history.push("/vendors"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllVendors = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getVendors", {params:userData})
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

export const registerVendor = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newVendor", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/vendors"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
