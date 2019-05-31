var express = require('express');
var router = express.Router();
var StudentModel = require('../../models/student/student');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');

router.get('/getList', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    StudentModel.getStudentList(decodedJWT.schoolId, function(err,rows){
      if(err){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/getExistingStudentDetail', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const body = req.body;
    StudentModel.getExistingStudentDetail(body, function(err,rows){
      if(err){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/getExistingStudentAndChildDetails', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const body = req.body;
    StudentModel.getExistingStudentAndChildDetails(body, function(err,rows){
      if(err){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/validateQRId', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const body = req.body;
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    StudentModel.validateQRId(body.qrId, decodedJWT.schoolId, function(err, rows){
      if(err || !rows){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/assignClass', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const body = req.body;
    StudentModel.getExistingStudentAndChildDetails(body, function(err,rows){
      if(err){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/createStudentAndAssignClass',
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.officeAdmin, (req, res) => {
    const body = req.body;
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    StudentModel.createStudentAndAssignClass(body, decodedJWT.schoolId, function(err,rows){
      if(err){
        // console.log(err);
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.json(rows);
      }
    });
  })
);

router.post('/',function(req,res,next){
  Task.addTask(req.body,function(err,count){
      if(err){
          res.json(err);
      }
      else{
          res.json(req.body);//or return count for 1 &amp;amp;amp; 0
      }
    });
 });

router.delete('/delete', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.manager, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const { target } = req.body;
    StudentModel.deactivateStudentAnnoucement(target, decodedJWT.uid, function(err){
      if(err){
        res.status(500).json({ error: 'Something failed!' });
      }else{
        res.status(200).send('Success')
      }
    });
  })
);

 module.exports=router;