const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  const email = data.email;
  var letters = /^[A-Za-z " "]+$/;

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  else if(!data.name.match(letters)){
      errors.name = "Name can only contain alphabets."
    }
  if (!Validator.isLength(data.name, { min: 0, max: 50 })) {
      errors.name = "Name cannot exceed length of 50 characters.";
    }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  else if (!Validator.isEmail(data.email))
      errors.email = "Email is invalid.";

// Role checks
if(Validator.isEmpty(data.role)){
  errors.role = "Role field is required";
}
else if(!(Validator.equals(data.role,"staff-member")|| Validator.equals(data.role,"supervisor")||Validator.equals(data.role,"admin")||Validator.equals(data.role,"super-admin"))){
  errors.role = "Role is invalid.";
}
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  else if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required.";
    }
  else if (!Validator.isLength(data.password, { min: 6, max: 30 }) || !Validator.isLength(data.password2, { min: 6, max: 30 })) {
      errors.password = "Password must be between 6-30 characters.";
    }


if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
