const error_codes = {
  E0: "undefined error occured",
  E1: "unexpected values recieved",
  E2: "token validation failed",
  E3: "values not found in database",
};
const logical_errors = {
  L1: "User is not admin",
  L2: "Domain already attempted",
  L3: "Time over",
  L4: "Test not started or already submitted",
  L5: "No such user present",
  L6: "Domain not attempted yet"
};

const success_codes = {
  S1: "successfully fetched candidate",
  S2: "successfully sent back questions",
  S3: "saved answers successfully",
  S4: "started test successfully"
}
module.exports = { error_codes, logical_errors, success_codes };