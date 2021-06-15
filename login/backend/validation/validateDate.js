const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDate(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";
// Email checks
if(Validator.isEmpty(data.dueDate)){
  errors.dueDate = "Due Date is required";
}
else if(!Validator.isDate("2021-06-19T00:00:00.000Z")){
  errors.dueDate = data.dueDate;
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};
