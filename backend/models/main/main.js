var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var MainModel={
  getVendorDetail:function(qrId, callback){
    const todayDate = moment().format('YYYY-MM-DD');
    const sql = ` SELECT 
                    vl.*
                  FROM
                      vendor_list vl
                  LEFT JOIN
                      __vendor_type vt ON vt.id = vl.type_id
                  WHERE
                      vl.is_confirmed AND vl.is_active AND qr_id = ?`;
    db.query(sql, [qrId])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {      
      logger.error(err)
      callback(err, null);
    });
  },
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

module.exports=MainModel;