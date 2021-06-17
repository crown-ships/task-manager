import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateCompany = (userData, history) => dispatch => {
  axios
    .post("http://localhost:4000/api/updCompany", userData.body, {params:userData.params})
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

export const deleteCompany = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("http://localhost:4000/api/delCompany", {params:userData})
    .then(res => history.push("/companies"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllCompanies = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("http://localhost:4000/api/getCompanies", {params:userData})
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

export const registerCompany = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("http://localhost:4000/api/newCompany", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      history.push("/companies"
)}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
