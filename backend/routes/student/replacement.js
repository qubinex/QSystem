var express = require('express');
var router = express.Router();
var ReplacementModel = require('../../models/student/replacement');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');
const moment = require('moment');

router.post('/scanQRCode', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    ReplacementModel.getStudentAttendantList(data.qrId, decodedJWT.schoolId, function(err,rows){
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

router.post('/submitReplacement', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    const { selectedSlot, qrId, attendanceId } = data
    ReplacementModel.submitReplacement(selectedSlot, qrId, attendanceId, decodedJWT.schoolId, decodedJWT.uid, function(err,rows){
      if(err){
        console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else if(rows === "0"){
        res.status(500).send({ error: 'There is something wrong with the data. Please refresh the page.' });
      }else{
        res.json(rows);
      }
    });
  })
);


module.exports=router;