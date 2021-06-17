const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatePaymentAmount(data) {
  let errors = {};

  if(!Validator.isInt(data.amtToBePaid)){
      errors.amtToBePaid = "Payment amount field is invalid";
  }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
