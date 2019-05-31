require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var logoutRouter = require('./routes/logout');
var usersRouter = require('./routes/users');
var student = require('./routes/student/student');
var country = require('./routes/_common/country');
var date = require('./routes/_common/date');
var studentAttendance = require('./routes/student/attendance');
var studentReplacement = require('./routes/student/replacement');
var studentLessonPayment = require('./routes/finance/lessonPayment');


const passport = require('passport');
require( './config/passport')(passport);

const morgan = require('morgan');
const logger = require('./services/logger');

var app = express();
app.use(helmet()); // https://helmetjs.github.io/
app.use(passport.initialize());

// Setup morgan - logging http
app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: logger.stream
}));

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode >= 400
  }, stream: logger.stream
}));


// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../ui/build'));

// pass the static files (react app) to the express app. 
app.use(staticFiles)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);
app.use('/attendanceStatistic', attendanceStatisticRouter);
app.use('/annoucement/employee', annoucementEmployee);
app.use('/annoucement/student', annoucementStudent);
app.use('/student/student', student);
app.use('/student/attendance', studentAttendance);
app.use('/student/replacement', studentReplacement);
app.use('/finance/lesson/payment', studentLessonPayment);
app.use('/employee/employee', employee);
app.use('/employee/recruitment', employeeRecruitment);
app.use('/lesson/lesson', lesson);
app.use('/school/school', school);
app.use('/school/academy', schoolAcademy);
app.use('/school/package', schoolPackage);
app.use('/school/schedule', schoolSchedule);
app.use('/api/country', country);
app.use('/api/date', date);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
