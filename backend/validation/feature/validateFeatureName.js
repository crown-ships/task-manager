const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateFeatureName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " " "%" "&" "(" ")" "-"]+$/;

  if (Validator.isEmpty(data.featureName)) {
    errors.featureName = "Name field is required.";
  }
  else if(!data.featureName.match(letters)){
      errors.featureName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.featureName, { min: 0, max: 50 })) {
      errors.featureName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
