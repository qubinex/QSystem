const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcrypt');
var db = require('./db');
const logger = require('../services/logger');

module.exports = function(passport) {

      // configure passport.js to use the local strategy
      passport.use(new LocalStrategy(
        { 
            usernameField: 'username',
            passwordField: 'password',
            //passReqToCallback : true, // allows us to pass back the entire request to the callback
        }, (username, password, done) => {
          console.log('Inside local strategy callback');
          // here is where you make a call to the database
          // to find the user based on their username or email address
          const sql = ` SELECT c.*, r.role_binary
                        FROM credential_backend c
                        RIGHT JOIN employee_in_school eis ON eis.credential_id = c.uid
                        RIGHT JOIN _system_user_role r ON r.role_id = eis.user_role
                        WHERE username = ?`;
          db.query(sql, [username])
            .then((result) => {
              const rows = result[0];
              if (!rows.length) {
                console.log('user not found');
                return done('No user found.'); // req.flash is the way to set flashdata using connect-flash
              }

              // if the user is found but the password is wrong
              bcrypt.compare(password, rows[0].password )
                .then((isMatch) => {
                  if(isMatch !== true){
                    console.log('Incorrect password');
                    return done('Oops! Wrong password.');
                  }
                  /*
                  if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                  */
                  console.log( 'passed');
                  // all is well, return successful user
                  return done(null, rows[0]);		
                });
              

            })
            .catch((err) => {
              logger.error(err);
              console.log(err);
              done(err);
            })
        }
      ));

      passport.use(new JWTStrategy({
          //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
          jwtFromRequest : req => req.cookies.jwt,
          secretOrKey: process.env.JWT_SECRET,
        },
        (jwtPayload, done) => {
          if (jwtPayload.expires < Date.now()){
            return done('jwt expired')
          }
          return done(null, jwtPayload);
        }
      ));
      
      /*
      // tell passport how to serialize the user
      passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is save to the session file store here')
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${id}`)
        const user = users[0].id === id ? users[0] : false; 
        done(null, user);
      });
      */
};