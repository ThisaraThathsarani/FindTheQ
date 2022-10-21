"use strict";

var dotenv = require('dotenv');

var jwt = require('jsonwebtoken'); // get password vars from .env file


dotenv.config();

function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(customername) {
  return jwt.sign({
    data: customername
  }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  });
}

module.exports = {
  authenticateToken: authenticateToken,
  generateAccessToken: generateAccessToken
};
//# sourceMappingURL=token.dev.js.map
