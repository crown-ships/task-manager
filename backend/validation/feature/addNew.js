const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateFeatureInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.featureName = !isEmpty(data.featureName) ? data.featureName : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";
  data.featureDetails = !isEmpty(data.featureDetails) ? data.featureDetails : "";

  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Name checks
  if (Validator.isEmpty(data.featureName)) {
    errors.featureName = "Name field is required.";
  }
  else if(!data.featureName.match(letters)){
      errors.featureName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.featureName, { min: 0, max: 50 })) {
      errors.featureName = "Name cannot exceed length of 50 characters.";
    }

// Details checks
  if (Validator.isEmpty(data.featureDetails)) {
    errors.featureDetails = "Details field is required.";
  }

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
