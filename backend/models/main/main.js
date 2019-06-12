var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var MainModel={
  getVendorDetail:function(qrId, callback){
    const todayDate = moment().format('YYYY-MM-DD');
    const sql = ` SELECT 
                    vl.*, vt.name vendor_type, IFNULL(avg_waiting_time_live, 0) as avg_waiting_time
                  FROM
                      merchant_list vl
                  LEFT JOIN
                      __vendor_type vt ON vt.id = vl.type_id
                  LEFT JOIN
                    ( SELECT vendor_id, IFNULL(AVG(CASE WHEN q.is_done AND q.end_time IS NOT NULL THEN MINUTE(TIMEDIFF( q.end_time, q.start_time)) ELSE 0 END), 0 ) as avg_waiting_time_live
                      FROM queue_record q WHERE is_done
                      GROUP BY vendor_id ) q ON q.vendor_id = vl.id
                  WHERE
                      vl.is_confirmed AND vl.is_active AND qr_id = ?`;
    db.query(sql, [qrId])
    .then((result) => {
      console.log(result[0])
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  searchVendor:function(text, callback){
    const sql = ` SELECT * 
                  FROM merchant_list vl
                  WHERE vl.name LIKE ? AND vl.is_confirmed AND vl.is_active
                  ORDER BY name`;
    db.query(sql, [`%${text}%`])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
}

module.exports=MainModel;