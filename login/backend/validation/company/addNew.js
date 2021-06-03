const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateCompanyInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.websiteURL = !isEmpty(data.websiteURL) ? data.websiteURL : "";
  data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";

  const email = data.email;
  var letters = /^[A-Za-z0-9 " "]+$/;
  var numbers = /^[0-9 "+"]+$/;


// Name checks
  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = "Name field is required.";
  }
  else if(!data.companyName.match(letters)){
      errors.companyName = "Name can only contain alphabets."
    }
  if (!Validator.isLength(data.companyName, { min: 0, max: 50 })) {
      errors.companyName = "Name cannot exceed length of 50 characters.";
    }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  else if (!Validator.isEmail(data.email))
      errors.email = "Email is invalid.";

// URL checks
  if(Validator.isEmpty(data.websiteURL)){
    errors.websiteURL = "URL field is required";
  }
  else if(!Validator.isURL(data.websiteURL)){
    errors.websiteURL = "URL field is invalid";
  }

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
