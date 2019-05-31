var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var Country={
  getCountryList:function(callback){
    db.query('SELECT * FROM _country WHERE is_enable ORDER BY country')
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  getStateList:function(countryId, callback){
    db.query('SELECT * FROM _state WHERE country=? AND is_enable ORDER BY state',
      [countryId])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  getCityList:function(stateId, callback){
    db.query('SELECT * FROM _city WHERE state_id =? AND is_enable ORDER BY city',
      [stateId])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  createNewStudentAnnouncement:function(data, schoolId, userId, callback){
    const actionDate = moment().format('YYYY-MM-DD HH:mm:ss');
    let lastInsertId = null;
    db.getConnection()
      .then((conn) => {
        conn.query('START TRANSACTION')
          .then(() => {
            const query = 'INSERT INTO student_annoucement SET annoucement_text=?, valid_from=?, valid_till=?, school_id=?, create_by=?, last_edit_on=?'
            const arg = [data.announcementText, moment(data.validFrom).format('YYYY-MM-DD HH:mm:ss'), moment(data.validTill).format('YYYY-MM-DD HH:mm:ss'), schoolId, userId, actionDate];
            return conn.query(query, arg);
          })
          .then((result) => {
            console.log(result[0].insertId);
            return conn.query("INSERT INTO activity_log_backend (activity, user, datetime) VALUES (?, ?, ?)",
              [`New student annoucement ${lastInsertId}`, userId, actionDate] )
          })
          .then(() => {
            return conn.query('COMMIT')
              .then(() => callback(null));
          })
          .catch((err) => {
            conn.rollback();
            logger.error(err);
            callback(err);
          });
      })
      .catch((err) => {
        logger.error(err);
        conn.rollback();
        callback(err);
      })

  }
}

module.exports=Country;