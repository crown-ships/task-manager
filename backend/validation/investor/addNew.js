const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestorInput(data) {
  let errors = {};


// Convert empty fields to an empty string so we can use validator functions
  data.investorName = !isEmpty(data.investorName) ? data.investorName : "";
  data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";
  data.investorEmail = !isEmpty(data.investorEmail) ? data.investorEmail : "";

  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Email checks
  if (Validator.isEmpty(data.investorEmail)) {
    errors.investorEmail = "Email field is required.";
  }
  else if (!Validator.isEmail(data.investorEmail))
      errors.investorEmail = "Email is invalid.";

// Name checks
  if (Validator.isEmpty(data.investorName)) {
    errors.investorName = "Name field is required.";
  }
  else if(!data.investorName.match(letters)){
      errors.investorName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.investorName, { min: 0, max: 50 })) {
      errors.investorName = "Name cannot exceed length of 50 characters.";
    }

//contactno
  if (Validator.isEmpty(data.contactNo)) {
    errors.contactNo = "Contact number field is required.";
  }
  else if(!data.contactNo.match(numbers)){
      errors.contactNo = "Contact number can only contain numbers."
  }
  if (!Validator.isLength(data.contactNo, { min: 10, max: 13 })) {
      errors.contactNo = "Contact numbers cannot exceed length of 50 characters.";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
