var db=require('../../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Auth={
  authenticationGetUser:function(email, callback){
    return db.query("SELECT * FROM credential_backend WHERE email = ?",
      [email], callback);
  },
  FindOrCreateConsumer:function(fbProfile, callback) {
    const {email, name, id} = fbProfile.response;
    let sql = ` SELECT facebook_id  FROM credential_consumer
                WHERE facebook_id = ? `;
    db.query(sql, [id])
      .then((result) => {
        if(result[0] && result[0].length ===1) {
          // user found by facebookId
          return callback(null, result[0]);
        } else {
          // create user with fb id
          console.log(`creating user with fb profile`);
          console.log(fbProfile.response);
          sql = ` INSERT INTO credential_consumer (email, username, nickname, facebook_id, password)
                  VALUES(?, ?, ?, ?, ?)`
          return db.query(sql, [email, name, name, id, 'DFGHGH%^&*(JNBVFTYHBVGYJJJ'])
        }
      })
      .then(() => {
        sql = ` SELECT * FROM credential_consumer
                WHERE facebook_id = ? `;
        return db.query(sql, [id]);
      })
      .then((result) => {
        callback(null, result[0][0]);
      })
      .catch((err) => {
        callback(err, null);
        console.log(err);
      })
  }
}
module.exports=Auth;