const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/env/development");

module.exports = {
  generateToken(email) {
    const option = { expiresIn: "1h" };
    payload = { email: email };
    return jwt.sign(payload, jwtSecret, option);
  },
};
