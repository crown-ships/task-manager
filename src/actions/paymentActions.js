import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updatePayment = (userData, history) => dispatch => {
  axios
    .post("http://localhost:4000/api/updPayment", userData.body, {params:userData.params})
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

export const updateAllPayments = (userData, history) => dispatch => {
  axios
    .post("http://localhost:4000/api/updAllPayments", userData.body, {params:userData.params})
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


export const deletePayment = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("http://localhost:4000/api/delPayment", {params:userData})
    .then(res => history.push("/vendors"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllPayments = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("http://localhost:4000/api/getPayments", {params:userData})
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

export const registerPayment = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("http://localhost:4000/api/newPayment", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/payments"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
