const axios = require('axios');
const passport = require('passport');
const queueModel = require('../../models/main/queue');

var queueSocket = {
  setQueStatusSocket:function(io) {
    let interval;
    io.on('authentication', passport.authenticate('jwt', { session: false }))
    io.on("connection", socket => {
      console.log("New client connected");
      const cookief =socket.handshake.headers.cookie;
      // console.log('testing');/*getApiAndEmit(socket)*/
      const param = socket.handshake.query['param'];
      this.emitQueueStatus(socket, param);
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        this.emitQueueStatus(socket, param);
      }, 10000);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("getQueueStatus", () => {
        const param = socket.handshake.query['param'];
        queueModel.getCurrentQueueStatus(param, (err, rows) => {
          // console.log('emitting', rows);
          socket.emit('queueStatusUpdate', rows);
        });
      });
    });
  },
  emitQueueStatus:function(socket, param) {
    queueModel.getCurrentQueueStatus(param, (err, rows) => {
      // console.log('emitting', rows);
      console.log(rows);
      const queueNr = rows ? rows[0].queue_count : 0;
      const maxQueueNr = rows ? rows[0].max_queue_nr : 'No queue';
      const array = { queueNr, maxQueueNr };
      socket.emit('queueStatusUpdate', JSON.stringify(array));
      // socket.emit('queueStatusUpdate', 'param: ' + param);
    });
  }
}

module.exports=queueSocket;