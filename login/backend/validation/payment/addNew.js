const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatePaymentInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.paymentName = !isEmpty(data.paymentName) ? data.paymentName : "";
  data.amtToBePaid = !isEmpty(data.amtToBePaid) ? data.amtToBePaid : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";


  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 ]+$/;


// Name checks
  if (Validator.isEmpty(data.paymentName)) {
    errors.paymentName = "Name field is required.";
  }
  else if(!data.paymentName.match(letters)){
      errors.paymentName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.paymentName, { min: 0, max: 50 })) {
      errors.paymentName = "Name cannot exceed length of 50 characters.";
    }

//amtToBePaid
  if(Validator.isEmpty(data.amtToBePaid)){
  errors.amtToBePaid = "amount field is required";
  }
  else if(!Validator.isInt(data.capitalPaid)){
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
