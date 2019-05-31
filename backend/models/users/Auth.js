var db=require('../../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Auth={
    authenticationGetUser:function(email, callback){
        return db.query("SELECT * FROM credential_backend WHERE email = ?",
            [email], callback);
    },
}
module.exports=Auth;