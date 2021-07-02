const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestmentName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " " "%" "&" "(" ")" "-"]+$/;
  if (Validator.isEmpty(data.investmentName)) {
    errors.investmentName = "Name field is required.";
  }
  else if(!data.investmentName.match(letters)){
      errors.investmentName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.investmentName, { min: 0, max: 50 })) {
      errors.investmentName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
