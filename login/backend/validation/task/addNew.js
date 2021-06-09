const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateTaskInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.taskName = !isEmpty(data.taskName) ? data.taskName : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";
  data.taskDetails = !isEmpty(data.taskDetails) ? data.taskDetails : "";

  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Name checks
  if (Validator.isEmpty(data.taskName)) {
    errors.taskName = "Name field is required.";
  }
  else if(!data.taskName.match(letters)){
      errors.taskName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.taskName, { min: 0, max: 50 })) {
      errors.taskName = "Name cannot exceed length of 50 characters.";
    }

// Details checks
  if (Validator.isEmpty(data.taskDetails)) {
    errors.taskDetails = "Details field is required.";
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
