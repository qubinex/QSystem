var express = require('express');
var router = express.Router();
const logger = require('../services/logger');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

// create the homepage route at '/'
router.get('/', (req, res, next) => {
  /*
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  */
  logger.debug('Debug statement');
  logger.error('error statement');
  logger.info('Info statement');
  res.render('index', { title: 'Express' });
  //res.send(`You hit home page!\n`)
})

module.exports = router;
