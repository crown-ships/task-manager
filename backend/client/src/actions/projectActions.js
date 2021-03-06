import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateProject = (userData, history) => dispatch => {
  axios
    .post("/api/updProject", userData.body, {params:userData.params})
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

export const updateAllProjects = (userData, history) => dispatch => {
  axios
    .post("/api/updAllProjects", userData.body, {params:userData.params})
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

export const deleteProject = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delProject", {params:userData})
    .then(res => history.push("/projects"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllProjects = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getProjects", {params:userData})
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

export const getFilteredProjects = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getFilteredProjects", {params:userData})
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

export const registerProject = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newProject", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/projects"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
