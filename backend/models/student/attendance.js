var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var StudentAttendance={
  getStudentAttendanceListOrSubmitAttendance:function(qrId, schoolId, canSubmitInvalidAttendance, scheduleStartTime, callback){
    let returnResult = [];
    let attendanceList = [];
    const todayDate = moment().format('YYYY-MM-DD');
    const sql = ` SELECT 
                    a.*, CASE WHEN DATE(a.system_attend_date) >= ? THEN TRUE ELSE FALSE END AS is_valid_attendance, ? > 0 as canSubmitInvalidAttendance
                  FROM
                      student_attendance a
                  LEFT JOIN
                      student_in_school s ON a.student_in_school_id = s.id
                  WHERE
                      NOT a.is_taken AND a.is_active AND s.qr_id = ? AND s.school_id = ?`;
    db.query(sql, [todayDate, canSubmitInvalidAttendance, qrId, schoolId])
    .then((result) => {
      attendanceList = result[0];
      returnResult.push(attendanceList);
      const sql = ` SELECT CONCAT(s.first_name, ', ', s.last_name) AS name,
                      asch.name AS schedule_name,
                      ag.name AS academy_group,
                      al.name AS academy_level,
                      sc.id AS student_in_school_id
                    FROM student_in_school sc
                    LEFT JOIN academy_schedule asch ON asch.id = sc.schedule_id
                    LEFT JOIN academy_level al ON al.id = asch.academy_level_id
                    LEFT JOIN academy_group ag ON ag.id = al.academy_group_id
                    LEFT JOIN student s ON s.id = sc.student_id
                    WHERE sc.qr_id = ? AND sc.school_id = ?`;
      return db.query(sql, [qrId, schoolId])
    })
    .then((result) => {
      returnResult.push(result[0]);
      const matchAttendance = attendanceList.find((e) => moment(e.actual_attend_date, 'YYYY-MM-DD HH:mm:ss').isSame(moment(scheduleStartTime)) && e.is_taken === 0);
      attendanceList.map((e) => console.log(moment(e.actual_attend_date, 'YYYY-MM-DD HH:mm:ss'), moment(scheduleStartTime) ) )
      console.log('match found', matchAttendance)
      if (matchAttendance) {
        const sql = ` UPDATE student_attendance SET is_taken = true
                      WHERE id = ? AND student_in_school_id = ? AND school_id = ? `
        return db.query(sql, [matchAttendance.id, matchAttendance.student_in_school_id, schoolId]);
      }
      // attendanceList.filter((e) => moment(e.actual_attend_date, 'YYYY-MM-DD HH:mm:ss') ===)
      // Promise.resolve()
    })
    .then((result) => {
      if (result) {
        console.log(result)
        returnResult.push(result);
      }
      callback(null, returnResult);
    })
    .catch((err) => {      
      logger.error(err)
      callback(err, null);
    });
  },/*
  getStudentAndClassDetail:function(qrId, schoolId, callback){
    const sql = ` SELECT CONCAT(s.first_name, ', ', s.last_name) as name, ls.start_time, 
                         ag.name as academy_group, al.name as academy_level, sc.id as student_in_school_id
                  FROM student_in_school sc
                  LEFT JOIN academy_slot ls ON ls.id = sc.schedule_id
                  LEFT JOIN academy_group ag ON ag.id = ls.academy_group_id
                  LEFT JOIN academy_level al ON al.id = ls.academy_level_id
                  LEFT JOIN student s ON s.id = sc.student_id
                  WHERE sc.qr_id = ? AND sc.school_id = ?`;
    db.query(sql, [qrId, schoolId])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },*/
  getClassSchedule:function(day, schoolId, callback){
    const sql = ` SELECT * 
                  FROM academy_slot
                  WHERE school_id = ? AND day = ?
                  ORDER BY day, start_time`;
    db.query(sql, [schoolId, day])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  submitAttendance:function(attendanceId, studentInClassId, schoolId, callback){
    const sql = ` UPDATE student_attendance SET is_taken = true
                  WHERE id = ? AND student_in_school_id = ? AND schoolId = ?`;
    db.query(sql, [attendanceId, studentInClassId, schoolId])
      .then((result) => {
        callback(null, result[0]['affectedRows']);
      })
      .catch((err) => {
        // console.log(err);
        logger.error(err)
        callback(err, null);
      })
  },
  getAttendanceListByTime:function(day, time, schoolId, dates, callback){
    console.log('asdfasdf'+time);
    // need add schedule_id in stdent_attendance
    let sql = ` SELECT CONCAT(s.first_name, ', ', s.last_name) as student_name, s.last_name, s.first_name, sa.*, sic.id
                FROM student_in_school sic
                LEFT JOIN student s ON s.id = sic.student_id
                LEFT JOIN (
                  SELECT
                  ${
                    dates.map(e => {
                      const date = moment(e).format('YYYY-MM-DD');
                      return `GROUP_CONCAT(CASE WHEN DATE(sa.system_attend_date) = '${date}' Then CONCAT(sa.is_taken, ';', sa.is_replaced ,';' ,IFNULL(sa.actual_attend_date, '')) END) as '${date}'`
                    })
                  },
                  sa.actual_attend_date, sa.student_in_school_id, sa.slot_in_schedule_id
                  FROM student_attendance sa
                  GROUP BY sa.student_in_school_id
                  ) sa ON sa.student_in_school_id = sic.id
                LEFT JOIN academy_slot_in_schedule sisch ON sisch.id = sa.slot_in_schedule_id
                LEFT JOIN academy_slot asl ON asl.id = sisch.slot_id
                WHERE asl.start_time=? AND sic.school_id=?`;
    db.query(sql, [time, schoolId])
      .then((result) => {
        callback(null, result[0]);
      })
      .catch((err) => {
        // console.log(err);
        logger.error(err)
        callback(err, null);
      })
  }
}

module.exports=StudentAttendance;