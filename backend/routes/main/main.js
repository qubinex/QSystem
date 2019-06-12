var express = require('express');
var router = express.Router();
var MainModel = require('../../models/main/main');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');
const moment = require('moment');

router.get('/searchByQRCode/:qrid', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.guest, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const { qrid } = req.params;
    const canSubmitInvalidAttendance = (decodedJWT.roleBinary && (userRoles.accessLevels.guest));
    MainModel.getVendorDetail(qrid, function(err,rows){
      if(err){
        console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        console.log(rows)
        res.json(rows);
      }
    });
  })
);

router.post('/searchByText', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.guest, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    MainModel.searchVendor(data.text, function(err,rows){
      if(err){
        console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

module.exports=router;