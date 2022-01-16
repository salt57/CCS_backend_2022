
require("dotenv/config");

const { google } = require("googleapis");

const authenticate = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  return { sheets };
};

const addToSheet = async (user) => {
    const { sheets } = await authenticate()
    const ccs_sheet = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1"
    })
    console.log(ccs_sheet)
};
addToSheet({ username: "sourish", email: "s@s.s", round: 1 });
module.exports = { addToSheet };
