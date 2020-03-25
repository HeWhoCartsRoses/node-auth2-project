module.exports = (req, res, next) => {
  if (req) {
    next();
  } else {
    res.status(401).json({
      you: "no bueno, señor!"
    });
  }
};
const jwt = require("jsonwebtoken"); //<<<install this npm package
module.exports = (req, res, next) => {
  const {
    authorization
  } = req.headers;
  const secret = process.env.JWT_SECRET || "I got a secret, I've been hiding, under my skin";
  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Credentials"
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "No credentials provided"
    });
  }
};