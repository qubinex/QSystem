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
    let sql = ` SELECT id, email, username, nickname, facebook_id FROM credential_consumer
                WHERE facebook_id = ? `;
    db.query(sql, [id])
      .then((result) => {
        if(result[0] && result[0].length === 1) {
          // user found by facebookId
          // console.log('result for existing user', result[0][0])
          return callback(null, result[0][0]);
        } else {
          // create user with fb id
          console.log(`creating user with fb profile`);
          console.log(fbProfile.response);
          sql = ` INSERT INTO credential_consumer (email, username, nickname, facebook_id, password)
                  VALUES(?, ?, ?, ?, ?)`
          db.query(sql, [email, name, name, id, 'DFGHGH%^&*(JNBVFTYHBVGYJJJ'])
          .then(() => {
            sql = ` SELECT * FROM credential_consumer
                    WHERE facebook_id = ? `;
            return db.query(sql, [id]);
          })
          .then((result) => {
            // onsole.log('result after create', result[0][0])
            callback(null, result[0][0]);
          })
          .catch((err) => {
            console.log(err);
            callback(err, null);
          })
        }
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      })
  }
}
module.exports=Auth;