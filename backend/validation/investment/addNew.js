const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateInvestmentInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.investmentName = !isEmpty(data.investmentName) ? data.investmentName : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.profitPercent = !isEmpty(data.profitPercent) ? data.profitPercent : "";
  data.capitalAmt = !isEmpty(data.capitalAmt) ? data.capitalAmt : "";
  data.capitalPaid = !isEmpty(data.capitalPaid) ? data.capitalPaid : "";
  data.investmentType = !isEmpty(data.investmentType) ? data.investmentType : "";
  data.paymentTerms = !isEmpty(data.paymentTerms) ? data.paymentTerms : "";

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

// Details checks
  if (Validator.isEmpty(data.investmentType)) {
    errors.investmentType = "investment type field is required.";
  }
  else if(!(Validator.equals(data.investmentType,"one-time")|| Validator.equals(data.investmentType,"recurring"))) {
    errors.investmentType = "investment type is invalid.";
  }

// Details checks
if (Validator.isEmpty(data.paymentTerms)) {
  errors.paymentTerms = "Payment terms field is required.";
}
else if(!(Validator.equals(data.paymentTerms,"none") || Validator.equals(data.paymentTerms,"monthly")|| Validator.equals(data.paymentTerms,"quarterly") || Validator.equals(data.paymentTerms,"half-yearly")|| Validator.equals(data.paymentTerms,"yearly"))) {
  errors.paymentTerms = "Payment terms is invalid.";
}

// Date checks
  if(Validator.isEmpty(data.dueDate)){
    errors.dueDate = "Due Date field is required";
  }
  else if(!Validator.isDate(data.dueDate)){
    errors.dueDate = "Due Date field is invalid";
  }

// Date checks
  if(Validator.isEmpty(data.startDate)){
    errors.startDate = "start Date field is required";
  }
  else if(!Validator.isDate(data.startDate)){
    errors.startDate = "start Date field is invalid";
  }

  // Date checks
  if(Validator.isEmpty(data.profitPercent)){
  errors.profitPercent = "profit percent field is required";
  }
  else if(!Validator.isInt(data.profitPercent)){
  errors.profitPercent = "profit percent  field is invalid";
  }
  // Date checks
  if(Validator.isEmpty(data.capitalAmt)){
  errors.capitalAmt = "Capital Amount field is required";
  }
  else if(!Validator.isInt(data.capitalAmt)){
  errors.capitalAmt = "Capital Amount field is invalid";
  }
  // Date checks
  if(Validator.isEmpty(data.capitalPaid)){
  errors.capitalPaid = "Capital paid field is required";
  }
  else if(!Validator.isInt(data.capitalPaid)){
  errors.capitalPaid = "Capital paid field is invalid";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
