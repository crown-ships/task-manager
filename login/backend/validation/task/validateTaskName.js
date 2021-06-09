const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateTaskName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " "]+$/;

  if (Validator.isEmpty(data.taskName)) {
    errors.taskName = "Name field is required.";
  }
  else if(!data.taskName.match(letters)){
      errors.taskName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.taskName, { min: 0, max: 50 })) {
      errors.taskName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
