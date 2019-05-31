var express = require('express');
var router = express.Router();
var AttendanceModel = require('../../models/student/attendance');
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

router.post('/getClassSchedule', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    const currentDay = data.day;
    AttendanceModel.getClassSchedule( currentDay, decodedJWT.schoolId, function(err,rows){
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

router.post('/submitAttendance', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    const { attendanceId, studentInClassId } = data;
    console.log(data);
    AttendanceModel.submitAttendance( attendanceId, studentInClassId, decodedJWT.schoolId, function(err,rows){
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

router.post('/getAttendanceListByTime', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    // Getting all the dates, it will be 3 week before today and 1 week after today
    let dates = [];
    const currentDate = moment().startOf('week').add(data.day, 'day');
    const threeWeeksBefore = currentDate.subtract(3, 'week');
    dates.push(threeWeeksBefore.clone());
    for (let i = 1; i <= 4; i ++) {
      threeWeeksBefore.add(1, 'week');
      dates.push(threeWeeksBefore.clone());
    }
  
    AttendanceModel.getAttendanceListByTime( data.day, data.time, decodedJWT.schoolId, dates, function(err,rows){
      if(err){
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        let result = [];
        result.push(rows);
        
        result.push(dates);
        // console.log(dates);
        res.json(result);
      }
    });
  })
);

module.exports=router;