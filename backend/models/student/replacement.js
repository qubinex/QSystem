var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var StudentReplacement={
  getStudentAttendantList:function(qrId, schoolId, callback) {
    let returnResult = [];
    const sql = ` SELECT * FROM student_attendance sa
                  WHERE sa.qr_id = ? AND NOT sa.is_taken AND NOT sa.is_absent AND school_id = ?`;
    db.query(sql, [qrId, schoolId])
      .then((result) => {
        returnResult.push(result[0]);
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
        callback(null, returnResult);
      })
      .catch((err) => {
        logger.error(err);
        callback(err, null);
      });
  },
  submitReplacement:function(replacementSlot, qrId, attendanceId, schoolId, uid, callback) {
    const { id, start } = replacementSlot;
    const sql = ` UPDATE student_attendance
                  SET actual_slot_id=?, actual_attend_date=?, updated_on=?, updated_by=?
                  WHERE qr_Id=? AND id=? AND school_id=?`;
    db.query(sql, [id, moment(start).format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'), uid, qrId, attendanceId, schoolId])
      .then((result) => {
        callback(null);
      })
      .catch((err) => {
        console.log(err)
        logger.error(err);
        callback(err, null)
      })   
  }
}

module.exports=StudentReplacement;