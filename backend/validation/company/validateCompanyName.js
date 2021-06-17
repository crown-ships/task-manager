const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateCompanyName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " "]+$/;

  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = "Name field is required.";
  }
  else if(!data.companyName.match(letters)){
      errors.companyName = "Name can only contain alphabets."
    }
  if (!Validator.isLength(data.companyName, { min: 0, max: 50 })) {
      errors.companyName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
