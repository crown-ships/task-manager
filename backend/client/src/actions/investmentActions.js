import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateInvestment = (userData, history) => dispatch => {
  axios
    .post("/api/updInv", userData.body, {params:userData.params})
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


export const deleteInvestment = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delInv", {params:userData})
    .then(res => history.push("/investments"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllInvestments = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getInvs", {params:userData})
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

export const registerInvestment = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newInv", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/investments"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
