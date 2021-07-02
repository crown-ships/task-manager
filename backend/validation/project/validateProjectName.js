const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateProjectName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " " "%" "&" "(" ")" "-"]+$/;

  if (Validator.isEmpty(data.projectName)) {
    errors.projectName = "Name field is required.";
  }
  else if(!data.projectName.match(letters)){
      errors.projectName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.projectName, { min: 0, max: 50 })) {
      errors.projectName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
