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
  searchVendor:function(text, callback){
    const sql = ` SELECT * 
                  FROM vendor_list vl
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