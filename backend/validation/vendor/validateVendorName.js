const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateVendorName(data) {
  let errors = {};
  var letters = /^[A-Za-z0-9 " "]+$/;

  if (Validator.isEmpty(data.vendorName)) {
    errors.vendorName = "Name field is required.";
  }
  else if(!data.vendorName.match(letters)){
      errors.vendorName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.vendorName, { min: 0, max: 50 })) {
      errors.vendorName = "Name cannot exceed length of 50 characters.";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
