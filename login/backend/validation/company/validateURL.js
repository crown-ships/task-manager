const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateURL(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.websiteURL = !isEmpty(data.websiteURL) ? data.websiteURL : "";
// Email checks
if(Validator.isEmpty(data.websiteURL)){
  errors.websiteURL = "URL field is required";
}
else if(!Validator.isURL(data.websiteURL)){
  errors.websiteURL = "URL field is invalid";
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};
