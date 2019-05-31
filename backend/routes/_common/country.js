var express = require('express');
var router = express.Router();
var CountryModel = require('../../models/_common/country');
const passport = require('passport');
const routesAuthService = require('../../services/routesAuthService');
const userRoles = require('../../config/userRoles');
var jwtDecode = require('jwt-decode');
const logger = require('../../services/logger');

router.get('/getCountryList', (req,res,next) => {
  CountryModel.getCountryList( function(err,rows){
    if(err){
      // console.log(err);
      logger.error(err);
      res.status(500).send({ error: 'Something failed!' });
    }else{
      res.json(rows);
    }
  })
});

router.get('/getStateListByCountry/:id', (req,res,next) => {
  CountryModel.getStateList( req.params.id, function(err,rows){
    if(err){
      // console.log(err);
      logger.error(err);
      res.status(500).send({ error: 'Something failed!' });
    }else{
      res.json(rows);
    }
  })
});

router.get('/getCityListByState/:id', (req,res,next) => {
  CountryModel.getCityList( req.params.id, function(err,rows){
    if(err){
      // console.log(err);
      logger.error(err);
      res.status(500).send({ error: 'Something failed!' });
    }else{
      res.json(rows);
    }
  })
});

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

router.post('/createStudentAnnouncement', 
  passport.authenticate('jwt', { session: false }), 
  routesAuthService.allowOnly(userRoles.accessLevels.manager, (req, res) => {
    const jwt = req.cookies.jwt;
    const decodedJWT = jwtDecode(jwt);
    const data = req.body;
    StudentModel.createNewStudentAnnouncement(data, decodedJWT.schoolId, decodedJWT.uid, function(err,rows){
      if(err){
        logger.error(err);
        res.status(500).send({ error: 'Something failed!' });
      }else{
        res.status(200).send('Success')
      }
    });
  })
);

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

router.put('/:id',function(req,res,next){
    Task.updateTask(req.params.id,req.body,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
 });
 module.exports=router;