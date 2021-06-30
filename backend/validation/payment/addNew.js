const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatePaymentInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.amtToBePaid = !isEmpty(data.amtToBePaid) ? data.amtToBePaid : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";


  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 ]+$/;



//amtToBePaid
  if(Validator.isEmpty(data.amtToBePaid)){
  errors.amtToBePaid = "amount field is required";
  }
  else if(!Validator.isInt(data.amtToBePaid)){
  errors.amtToBePaid = "amount field is invalid";
  }
  return {
      errors,
      isValid: isEmpty(errors)
  };

// Date checks
  if(Validator.isEmpty(data.dueDate)){
    errors.dueDate = "Date field is required";
  }
  else if(!Validator.isDate(data.dueDate)){
    errors.dueDate = "Date field is invalid";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
