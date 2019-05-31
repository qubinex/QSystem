'use strict';
var jwtDecode = require('jwt-decode');
/*
  Checking if user has required role
*/
exports.allowOnly = function(accessLevel, callback) {
  function checkUserRole(req, res) {
    let jwt = req.cookies.jwt;
    let decodedJWT = jwtDecode(jwt);
    // console.log( decodedJWT)
    if(!decodedJWT.roleBinary || !(accessLevel & decodedJWT.roleBinary)) {
      res.status(403).send(`Unautorized! IP Address: ${req.ip}`);
      return;
    }

    callback(req, res);
  }

  return checkUserRole;
};