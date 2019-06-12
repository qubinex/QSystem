var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var QueueModel={
  getQueueDashBoard:function(uid, callback) {
    // const startDate = moment();
    const startDate = moment('2019-06-03'); // for demo
    const endDate = moment('2019-06-03').add(7, 'days');
    const sql = ` SELECT qr.*, vl.name, qrc.*, qrc1.*
                  FROM queue_record qr
                  LEFT JOIN merchant_list vl ON vl.id = qr.vendor_id
                  LEFT JOIN (
                    SELEcT count(id) queue_length, MAX(queue_nr) max_queue_nr, vendor_id
                    FROM queue_record
                    GROUP BY vendor_id, date 
                  ) as qrc ON qrc.vendor_id = qr.vendor_id
                  LEFT JOIN (
                    SELEcT MAX(queue_nr) current_queue, vendor_id
                    FROM queue_record
                    WHERE is_done
                    GROUP BY vendor_id, date 
                  ) as qrc1 ON qrc1.vendor_id = qr.vendor_id
                  WHERE consumer_id=? AND date BETWEEN ? AND ? `;
    db.query(sql, [uid, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')])
      .then((result) => {
        callback(null, result[0]);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err)
        callback(err, null);
      });
  },
  leaveQueue:function(queueId, callback) {
    const sql = ` UPDATE queue_record SET is_cancelled = TRUE WHERE id = ?`;
    db.query(sql, [queueId])
      .then((result) => {
        callback(null, result[0]);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err)
        callback(err, null);
      });
  },
  getCurrentQueueStatus:function(qrId, callback){
    // const todayDate = moment().format('YYYY-MM-DD');
    const todayDate = moment('2019-06-03').format('YYYY-MM-DD'); // for demo purpose
    const sql = ` SELECT count(q.id) as queue_count, max(queue_nr) as max_queue_nr
                  FROM queue_record q
                  LEFT JOIN merchant_list v ON v.id = q.vendor_id
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
  submitQueue:function(uid, vendorId, callback) {
    // const momentNow = moment();
    const momentNow = moment('2019-06-03'); // for demo purpose
    const todayDate = momentNow.format('YYYY-MM-DD');
    const time = momentNow.format('YYYY-MM-DD HH:mm:ss');
    let sql = ` SELECT MAX(queue_nr) max_queue_nr FROM queue_record WHERE vendor_id =? AND date=?`;
    db.query(sql, [ vendorId, todayDate ])
    .then((result) => {
      let nextQueueNr = 100000;
      console.log(result)
      if(result[0][0].max_queue_nr) {
        nextQueueNr = result[0][0].max_queue_nr + 1;
      }
      sql = ` INSERT INTO queue_record (vendor_id, consumer_id, date, start_time, queue_nr)
              VALUES (?, ?, ?, ?, ?)`;
      const values = [ vendorId, uid, todayDate, time, nextQueueNr ];
      return db.query(sql, values);
      }) 
      .then((result) => {
        callback(null);
      })
      .catch((err) => {
        console.log(err)
        logger.error(err)
        callback(err, null);
      });
  }
}

module.exports=QueueModel;