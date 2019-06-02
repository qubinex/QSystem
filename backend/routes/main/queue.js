var express = require('express');
var router = express.Router();
var QueueModel = require('../../models/main/queue');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');
const moment = require('moment');

router.post('/getCurrentQueueStatus', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.guest, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    QueueModel.getCurrentQueueStatus(data.qrId, function(err,rows){
      if(err){
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);


module.exports=router;