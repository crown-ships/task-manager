const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestmentCPaid(data) {
  let errors = {};

  if(Validator.isEmpty(data.capitalPaid)){
  errors.capitalPaid = "Capital paid field is required";
  }
  else if(!Validator.isInt(data.capitalPaid)){
  errors.capitalPaid = "Capital paid field is invalid";
  }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
