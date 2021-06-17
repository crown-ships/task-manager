const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatePaymentName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " "]+$/;

  if (Validator.isEmpty(data.paymentName)) {
    errors.paymentName = "Name field is required.";
  }
  else if(!data.paymentName.match(letters)){
      errors.paymentName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.paymentName, { min: 0, max: 50 })) {
      errors.paymentName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
