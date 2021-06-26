import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateTask = (userData, history) => dispatch => {
  axios
    .post("/api/updTask", userData.body, {params:userData.params})
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

export const deleteTask = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delTask", {params:userData})
    .then(res => history.push("/projects"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllTasks = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getTasks", {params:userData})
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

export const updateAllTasks = (userData, history) => dispatch => {
  axios
    .post("/api/updAllTasks", userData.body, {params:userData.params})
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

export const registerTask = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newTask", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/Tasks"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
