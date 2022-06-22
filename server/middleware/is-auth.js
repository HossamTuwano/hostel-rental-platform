const jwt = require("jsonwebtoken");
require("dotenv/config");

const secret = process.env.secret;
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error();
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, secret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodeToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;  
    throw error;
  }
  req.userId = decodeToken.userId;
  next();
};
  