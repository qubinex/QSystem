var db=require('../../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Auth={
  authenticationGetUser:function(email, callback){
    return db.query("SELECT * FROM credential_backend WHERE email = ?",
      [email], callback);
  },
  FindOrCreateConsumer:function(fbProfile, callback) {
    const sql = ` SELECT facebook_id  FROM credential_consumer
                  WHERE facebook_id = ? `;
    db.query(sql, [fbProfile.id])
      .then((result) => {
        if(result[0] && result[0].length ===1) {
          // user found by facebookId
          callback(null, result[0]);
        } else {
          // create user with fb id
          console.log(`creating user with fb profile`)
          console.log(fbProfile);
        }
      })
      .catch((err) => {

      })
  }
}
module.exports=Auth;