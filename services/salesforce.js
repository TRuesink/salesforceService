const jsforce = require("jsforce");
const keys = require("../config/keys");

exports.oauth2 = new jsforce.OAuth2({
  loginUrl: "https://login.salesforce.com",
  clientId: keys.salesforceClientId,
  clientSecret: keys.salesforceClientSecret,
  redirectUri: keys.salesforceRedirectUri,
});

exports.createConnection = (oauth2, auth) => {
  const conn = new jsforce.Connection({
    oauth2,
    instanceUrl: auth.instanceUrl,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  });
  return conn;
};

exports.establishConnection = (oauth2) => {
  const conn = new jsforce.Connection({ oauth2 });
  return conn;
};
