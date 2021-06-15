const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateProjectInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.projectName = !isEmpty(data.projectName) ? data.projectName : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";
  data.projectDetails = !isEmpty(data.projectDetails) ? data.projectDetails : "";

  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Name checks
  if (Validator.isEmpty(data.projectName)) {
    errors.projectName = "Name field is required.";
  }
  else if(!data.projectName.match(letters)){
      errors.projectName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.projectName, { min: 0, max: 50 })) {
      errors.projectName = "Name cannot exceed length of 50 characters.";
    }

  if (Validator.isEmpty(data.ownerName)) {
    errors.ownerName = "Name field is required.";
  }
  else if(!data.ownerName.match(letters)){
      errors.ownerName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.ownerName, { min: 0, max: 50 })) {
      errors.ownerName = "Name cannot exceed length of 50 characters.";
    }

// Details checks
  if (Validator.isEmpty(data.projectDetails)) {
    errors.projectDetails = "Details field is required.";
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
