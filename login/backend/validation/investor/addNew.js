const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestorInput(data) {
  let errors = {};


// Convert empty fields to an empty string so we can use validator functions
  data.investmentName = !isEmpty(data.investmentName) ? data.investmentName : "";
  data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";


  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Name checks
  if (Validator.isEmpty(data.investmentName)) {
    errors.investmentName = "Name field is required.";
  }
  else if(!data.investmentName.match(letters)){
      errors.investmentName = "Name can only contain alphanumeric characters."
    }
  if (!Validator.isLength(data.investmentName, { min: 0, max: 50 })) {
      errors.investmentName = "Name cannot exceed length of 50 characters.";
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
