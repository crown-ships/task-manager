const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateEmail(data) {
  let errors = {};

  // Email checks
    if (Validator.isEmpty(data.investorEmail)) {
      errors.investorEmail = "Email field is required.";
    }
    else if (!Validator.isEmail(data.investorEmail))
        errors.investorEmail = "Email is invalid.";
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
