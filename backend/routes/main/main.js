var express = require('express');
var router = express.Router();
var AttendanceModel = require('../../models/student/attendance');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');
const moment = require('moment');

router.post('/searchByQRCode', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    const canSubmitInvalidAttendance = (decodedJWT.roleBinary && (userRoles.accessLevels.manager & decodedJWT.roleBinary));
    AttendanceModel.getStudentAttendanceListOrSubmitAttendance(data.qrId, decodedJWT.schoolId, canSubmitInvalidAttendance, data.selectedScheduleStartTime, function(err,rows){
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