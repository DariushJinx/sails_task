const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/env/development");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token.split(" ")[1], jwtSecret);

    // Attach the decoded token to the request object
    req.user = decodedToken;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
