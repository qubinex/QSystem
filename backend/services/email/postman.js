
const transporter = require('./transporter');

const postman = {
  sendMail:function(recipient, subject, bodyText ) {
    let mailOptions = {
      from: '"Akademeet.com" <no-reply@akademeet.com>', // sender address
      to: recipient, // list of receivers
      subject: subject, // Subject line
      // text: 'req.body.body', // plain text body
      html: bodyText,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      });
  },
} 
 


  module.exports=postman;