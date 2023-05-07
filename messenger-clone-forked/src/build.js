const express = require("express");
const app = express();

const firebaseAdmin = require("firebase-admin");
const firebaseApp = firebaseAdmin.initializeApp();

const appCheckVerification = async (req, res, next) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");

  if (!appCheckToken) {
    res.status(401);
    return next("Unauthorized");
  }

  try {
    const appCheckClaims = await firebaseAdmin
      .appCheck()
      .verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware
    // function in the stack.
    return next();
  } catch (err) {
    res.status(401);
    return next("Unauthorized");
  }
};

app.get("/yourApiEndpoint", [appCheckVerification], (req, res) => {
  // Handle request.
});
