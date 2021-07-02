const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestorName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " " "%" "&" "(" ")" "-"]+$/;

  if (Validator.isEmpty(data.investorName)) {
    errors.investorName = "Name field is required.";
  }
  else if(!data.investorName.match(letters)){
      errors.investorName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.investorName, { min: 0, max: 50 })) {
      errors.investorName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
