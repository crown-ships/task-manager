import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateInvestor = (userData, history) => dispatch => {
  axios
    .post("/api/updInvestor", userData.body, {params:userData.params})
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


export const deleteInvestor = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delInvestor", {params:userData})
    .then(res => history.push("/Investments"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllInvestors = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getInvestors", {params:userData})
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

export const registerInvestor = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newInvestor", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/Investors"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
