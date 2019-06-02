var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var MainModel={
  getMerchantQueueList:function(merchantId, callback){
    const todayDate = moment().format('YYYY-MM-DD');
    const sql = ` SELECT 
                    qr.id, qr.reserve_capacity, qr.other_details, qr.queue_nr, vl.name, cs.nickname, cs.username
                  FROM queue_record qr
                  LEFT JOIN credential_consumer cs ON cs.id = qr.consumer_id
                  LEFT JOIN merchant_list vl ON vl.id = qr.vendor_id
                  LEFT JOIN __vendor_type vt ON vt.id = vl.type_id
                  WHERE qr.vendor_id = ? AND NOT is_done AND NOT is_cancelled AND date=?`;

    db.query(sql, [merchantId, todayDate])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
  confirmAttendance:function(queueId, callback) {
    const sql = ` UPDATE queue_record SET is_done = TRUE WHERE id = ?`;
    db.query(sql, [queueId])
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        logger.error(err)
        callback(err, null);
      });
  },
  cancelAttendance:function(queueId, callback) {
    const sql = ` UPDATE queue_record SET is_cancelled = TRUE WHERE id = ?`;
    db.query(sql, [queueId])
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        logger.error(err)
        callback(err, null);
      });
  },
}

module.exports=MainModel;