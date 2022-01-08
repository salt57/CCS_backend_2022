const error_codes = {
  E0: "undefined error occured",
  E1: "unexpected values recieved",
  E2: "token validation failed",
  E3: "values not found in database",
};
const logical_errors = {
  L7: "Question attempted",
  L1: "User is not admin"
};

const success_codes = {
  S1: "successfully fetched candidate"
}
module.exports = { error_codes, logical_errors, success_codes };