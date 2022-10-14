const jwt = require("jsonwebtoken");

function createToken(payload, expiry = 60 * 60) {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn: expiry });
  } catch (e) {
    console.log(e);
  }
  return undefined;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (e) {
    console.log(e);
  }
  return null;
}

module.exports = { createToken, verifyToken };
