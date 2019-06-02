var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var QueueModel={
  getCurrentQueueStatus:function(qrId, callback){
    const todayDate = moment().format('YYYY-MM-DD');
    const sql = ` SELECT count(q.id) as queue_count
                  FROM queue_record q
                  LEFT JOIN vendor_list v ON v.id = q.vendor_id
                  WHERE v.qr_id = ? AND NOT q.is_done AND NOT q.is_cancelled AND date = ?
                  GROUP BY date`;
    db.query(sql, [qrId, todayDate])
    .then((result) => {
      callback(null, result[0]);
    })
    .catch((err) => {
      logger.error(err)
      callback(err, null);
    });
  },
}

module.exports=QueueModel;