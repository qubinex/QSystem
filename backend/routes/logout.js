var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

// create the homepage route at '/'
router.post('/', (req, res, next) => {
  console.log('Bye bye user')
  // res.render('index', { title: 'Express' });
  res.cookie('jwt', '', { 
    httpOnly: true,
    secure: process.env.JWT_COOKIE_IS_SECURE === 'true',
  })
  res.status(200).send('logout');
  // res.send(`You hit home page!\n`)
})

module.exports = router;
