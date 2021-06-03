const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateName(data) {
  let errors = {};
  var letters = /^[A-Za-z " "]+$/;
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  else if(!data.name.match(letters)){
      errors.name = "Name can only contain alphabets."
    }
  if (!Validator.isLength(data.name, { min: 0, max: 50 })) {
      errors.name = "Name cannot exceed length of 50 characters.";
  }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
