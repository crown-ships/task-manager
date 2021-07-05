const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateOwnerName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " " "&" "(" ")" "-"]+$/;

  if (Validator.isEmpty(data.ownerName)) {
    errors.ownerName = "Name field is required.";
  }
  else if(!data.ownerName.match(letters)){
      errors.ownerName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.ownerName, { min: 0, max: 300})) {
      errors.ownerName = "Name cannot exceed length of 300 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
