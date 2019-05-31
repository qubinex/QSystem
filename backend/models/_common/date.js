var db = require('../../config/db');
var moment = require('moment');
const logger = require('../../services/logger');

var Date={
  getDaysInWeek:function(callback){
    let days = [];
    for(let i = 1; i <= 7; i++) {
      const day = i;
      const dayString = moment().startOf('isoWeek').add(i - 1, 'day').format('dddd');
      const temp = { 'day': day, 'dayString': dayString };
      days.push(temp);
    }
    // console.log(days);
    callback(null, days);
  },
}

module.exports=Date;