import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateFeature = (userData, history) => dispatch => {
  axios
    .post("/api/updFeature", userData.body, {params:userData.params})
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

export const deleteFeature = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delFeature", {params:userData})
    .then(res => history.push("/projects"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllFeatures = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getFeatures", {params:userData})
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

export const getFilteredFeatures = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getFilteredFeatures", {params:userData})
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

export const updateAllFeatures = (userData, history) => dispatch => {
  axios
    .post("/api/updAllFeatures", userData.body, {params:userData.params})
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

export const registerFeature = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newFeature", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/features"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
