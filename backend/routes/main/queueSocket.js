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
      queueModel.getCurrentQueueStatus(param, (rows, error) => {
        // console.log('emitting', rows);
        const queueNr = rows ? rows[0].queue_count : 0;
        socket.emit('queueStatusUpdate', queueNr);
        // socket.emit('queueStatusUpdate', 'param: ' + param);
      });
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        queueModel.getCurrentQueueStatus(param, (rows, error) => {
          // console.log('emitting', rows);
          const queueNr = rows ? rows[0].queue_count : 0;
          socket.emit('queueStatusUpdate', queueNr);
          // socket.emit('queueStatusUpdate', 'param: ' + param);
        });
      }, 10000);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("getQueueStatus", () => {
        const param = socket.handshake.query['param'];
        queueModel.getCurrentQueueStatus(param, (rows, error) => {
          // console.log('emitting', rows);
          socket.emit('queueStatusUpdate', rows);
        });
      });
    });
  },
  getQueueStatus:function(socket) {
    
  }
}

module.exports=queueSocket;