var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var Student={
  getStudentList:function(schoolId, callback){
    db.query(`SELECT s.*, g.description as gender FROM student_in_school sis 
      LEFT JOIN student s ON sis.student_id = s.id
      LEFT JOIN _gender g ON g.id = s.gender_id
      WHERE sis.school_id=? AND sis.is_active ORDER BY sis.create_on DESC`,
      [schoolId])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      console.log(err);
      logger.error(err)
      callback(err, null);
    });
  },
  getExistingStudentDetail:function(reqBody, callback){
    db.query(`SELECT s.* FROM student s WHERE s.email=? AND RIGHT(s.contact_number, 4)=?`,
      [reqBody.email, reqBody.contactLast4Digits])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  validateQRId:function(qrId, schoolId, callback){
    const qrIds = qrId.split(';');
    db.query(`SELECT 1 FROM student_in_school s WHERE s.qr_id IN ? AND s.school_id=?`,
      [[qrIds], schoolId])
    .then((result) => {
      // console.log(result);
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  getExistingStudentAndChildDetails:function(reqBody, callback){
    const sql = `SELECT s.id, CONCAT( s.first_name, ', ', s.last_name) as name 
      FROM student s 
      LEFT JOIN student as p ON s.parent_id = p.id 
      WHERE (s.email=? AND RIGHT(s.contact_number, 4)=?) OR (p.email=? AND RIGHT(p.contact_number, 4)=?)`;
    console.log(reqBody.email, reqBody.contactLast4Digits);
    db.query(sql,
      [reqBody.email, reqBody.contactLast4Digits, reqBody.email, reqBody.contactLast4Digits])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  createStudentAndAssignClass:function(reqBody, schoolId, callback){
    const { newStudentInfo, newStudentMedicationInfo, selectedClass } = reqBody;
    const n = newStudentInfo;
    const m = newStudentMedicationInfo;
    const s = selectedClass;
    let id = '';
    const createOn = moment().format('YYYY-MM-DD HH:mm:ss');
    let sql = `INSERT INTO student
                (last_name, first_name, identification_id, email, contact_country_code, contact_number, gender_id, dob,
                address_line1, address_line2, address_state, address_country, address_postcode,
                emergency_name, emergency_contact_number, emergency_relationship, created_on )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    let values = [n.lastName, n.firstName, n.identification, n.email, n.contactCountryCode, n.contact,
      n.gender,  moment(n.dob.date).format('YYYY-MM-DD HH:mm:ss'), 
      n.addressLine1, n.addressLine2, n.state, n.country, n.postcode, 
      null, null, null, moment().format('YYYY-MM-DD HH:mm:ss') ]
    console.log( m );
    db.getConnection()
      .then((conn) => {
        conn.query('START TRANSACTION')
          .then(() => {
            console.log('start transaction')
            return conn.query(sql, values);
          })
          .then((result) => {
            id = String(result[0].insertId);
            sql = `INSERT INTO student_medical (student_id, medical_type, medical_description) VALUE ?`;
            const valuesArr = [];
            m.map((e) => {
              valuesArr.push([id, e.type || 0, e.description]);
            });
            return conn.query(sql, [valuesArr])
          })
          .then((result) => {
            sql = 'SELECT short_form FROM school where id = ?';
            return conn.query(sql, [schoolId])
          })
          .then((result) => {
            const shortForm = result[0][0]['short_form'];
            console.log(shortForm);
            let qrId = id.padStart(9, '0');
            qrId = `${shortForm}-${qrId}`;
            sql = `INSERT INTO student_in_school (student_id, schedule_id, school_id, qr_id, create_on) VALUES (?, ?, ?, ?, ?)`;
            values = [id, s.id, schoolId, qrId, createOn];
            return conn.query(sql, values);
          })
          .then((result) => {
            return conn.query('COMMIT')
              .then(() => callback(null));
          })
          .catch((err) => {
            console.log(err);
            conn.rollback();
            logger.error(err);
            callback(err);
          });
      })
      .catch((err) => {
        logger.error(err);
        conn.rollback();
        callback(err);
      });
  },

}

module.exports=Student;