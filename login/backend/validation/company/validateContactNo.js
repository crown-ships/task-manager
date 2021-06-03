const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateContactNo(data) {
  let errors = {};
  var numbers = /^[0-9 "+"]+$/;

  if (Validator.isEmpty(data.contactNo)) {
    errors.contactNo = "Contact number field is required.";
  }
  else if(!data.contactNo.match(numbers)){
      errors.contactNo = "Contact number can only contain numbers."
  }
  if (!Validator.isLength(data.contactNo, { min: 10, max: 13 })) {
      errors.contactNo = "Contact numbers cannot exceed length of 50 characters.";
  }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
