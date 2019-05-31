var express = require('express');
var router = express.Router();
var DateModel = require('../../models/_common/date');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');

router.post('/getDaysInWeek', (req,res,next) => {
  DateModel.getDaysInWeek( function(err,rows){
    if(err){
      // console.log(err);
      logger.error(err);
      res.status(500).send({ error: 'Something failed!' });
    }else{
      res.json(rows);
    }
  })
});

 module.exports=router;