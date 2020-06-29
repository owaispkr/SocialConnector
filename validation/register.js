const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field required";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Email field required";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 and 30 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password length should be between 6 and 20";
  }

  if (!Validator.isLength(data.confirmPassword, { min: 6, max: 20 })) {
    errors.confirmPassword =
      "Confirm Password length should be between 6 and 20";
  }

  if (!Validator.equals(data.confirmPassword, data.password)) {
    errors.confirmPassword = "Mismatch confirm password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
