var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
const userRoles = require('../config/userRoles');
const Auth = require('../models/users/Auth');

// sidebar nav config
const consumerNav = require('../views/_nav/_nav_consumer');
const merchantNav = require('../views/_nav/_nav_merchant');


// header nav config
const headerNav = require('../views/_nav/_header'); 

// create the homepage route at '/'
router.get('/', (req, res, next) => {
  /*
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  */
  res.render('index', { title: 'Express' });
  //res.send(`You hit home page!\n`)
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  // console.log( req.body);
  passport.authenticate('consumer-local', {session: false}, (err, user, info) => {
    req.login(user, {session: false}, (err) => {
      console.log('Using passport-local authentication...')
      // console.log('Inside req.login() callback')
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      // console.log(`req.user: ${JSON.stringify(req.body)}`)
      // console.log(`User authenticated? ${req.isAuthenticated()}`)
      
      // if error
      if (err){
        console.log( 'Login error occured' );
        console.log( err );
        return res.status(400).send('Something went wrong, please contact Akademeet');
      }

      // if not valid user
      if (!user){
        console.log( 'no valid user found' );
        console.log( err );
        return res.status(401).send('Wrong combination of username/password.');
      }
      // JWT payload
      let expires = Date.now() + parseInt(process.env.JWT_EXPIRATION_MS);
      /*
      console.log('expirey after create: ' + expires)
      console.log('Date.now(): ' + Date.now())
      */
      console.log(user);
      const payload = {
        uid: user.id,
        username: user.username,
        expires: expires,
        roleBinary: user.role_binary || userRoles.accessLevels.guest,
      }
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
      
      console.log('Token: ' + token);
      console.log('User name: ' + user.username);

      res.cookie('jwt', token, { 
        httpOnly: true,
        secure: process.env.JWT_COOKIE_IS_SECURE === 'true',
        expire: expires,
        overwrite: true,
      });
      res.status(200).send({ username, token });
      //return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
});

router.post('/loginMerchant', (req, res, next) => {
  const { username, password } = req.body;
  // console.log( req.body);
  passport.authenticate('merchant-local', {session: false}, (err, user, info) => {
    req.login(user, {session: false}, (err) => {
      // if error
      if (err){
        console.log( 'Login error occured' );
        console.log( err );
        return res.status(400).send('Something went wrong, please contact Akademeet');
      }
      // if not valid user
      if (!user){
        console.log( 'no valid user found' );
        console.log( err );
        return res.status(401).send('Wrong combination of username/password.');
      }
      // JWT payload
      let expires = Date.now() + parseInt(process.env.JWT_EXPIRATION_MS);
      /*
      console.log('expirey after create: ' + expires)
      console.log('Date.now(): ' + Date.now())
      */
      // console.log(user);
      const payload = {
        uid: user.id,
        username: user.username,
        expires: expires,
        roleBinary: user.role_binary || userRoles.accessLevels.guest,
        merchantId: user.merchant_id,
      }
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
      
      console.log('Token: ' + token);
      console.log('User name: ' + user.username);

      res.cookie('jwt', token, { 
        httpOnly: true,
        secure: process.env.JWT_COOKIE_IS_SECURE === 'true',
        expire: expires,
        overwrite: true,
      });
      res.status(200).send({ username, token });
      //return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
});

router.get('/facebook/callback',
(err, user, info) => {
    console.log('fb login success');
  }
);

router.post('/verifyFacebookLogin', (req, res) => {
  console.log(req.body);
  Auth.FindOrCreateConsumer(req.body, (err, rows) => {
    // if error
    if (err){
      console.log( 'Login error occured' );
      console.log( err );
      return res.status(400).send('Something went wrong, please contact Akademeet');
    }
    // JWT payload
    let expires = Date.now() + parseInt(process.env.JWT_EXPIRATION_MS);
    
    const user = rows;
    username = user.username;
    console.log('>>>>>'+rows)
    const payload = {
      uid: user.id,
      username: user.username,
      expires: expires,
      roleBinary: user.role_binary || userRoles.accessLevels.guest,
      // merchantId: 2,
    }
    
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    
    console.log('Token: ' + token);
    console.log('User name: ' + user.username);

    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: process.env.JWT_COOKIE_IS_SECURE === 'true',
      expire: expires,
      overwrite: true,
    });
    res.status(200).send({ username, token });
  })
})

router.post('/verifyToken',  (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, token) => {
    console.log('verifying token in server side...');
    console.log('token:' + token);
    if(err || !token){
      console.log(err);
      return res.status(401).send('Invalid session token.');
    }
    res.status(200).send({ token });
  })(req, res);
});

router.post('/getNavigationOnUserRole', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, token) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const roleBinary = decodedJWT.roleBinary;
    const body = req.body;
    const { category } = body;
    if(err || !token){
      console.log(err);
      return res.status(401).send('Invalid session token');
    }
    let component = [];
    let headers = [];
    if(decodedJWT.merchantId) {
      component = merchantNav;
    } else {
      component = consumerNav;
    }
    
    headers = headerNav.items.map((e) => {
      if((e.role & roleBinary)) {
        return { name: e.name, url: e.url, icon: e.icon };
      }
    }).filter(e => e);

    res.status(200).send({ component, headers });
  })(req, res);
});

module.exports = router;
