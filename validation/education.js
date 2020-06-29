const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.fromDate = !isEmpty(data.fromDate) ? data.fromDate : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field required";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Degree field required";
  }

  if (Validator.isEmpty(data.fromDate)) {
    errors.fromDate = "From Date field required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
