const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = {
  sendEmail: function(account, params, failureCallback, successCallback) {

    // create reusable transporter object using the default SMTP transport
    let smtpTransport;

    if (account.host) {
      smtpTransport = nodemailer.createTransport({
        host: account.host,
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.password // generated ethereal password
        }
      });
    } else {
      smtpTransport = nodemailer.createTransport({
        service: 'Gmail', // sets automatically host, port and connection security settings
        auth: {
          user: account.user,
          pass: account.password
        }
      });
    }

    let toEmail = params.to[0];
    for (let i = 1; i < params.to.length; i++) {
      toEmail += ', ' + params.to[i];
    }

    // setup email data with unicode symbols
    const mailOptions = {
      from: params.from, // sender address
      to: toEmail, // list of receivers
      subject: params.subject, // Subject line
      text: params.text, // plain text body
      html: params.html, // html body
      amp: params.amp, // amp4email
      attachments: params.attachments
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        failureCallback(error);
      } else {
        successCallback(info);
      }
      smtpTransport.close(); // shut down the connection pool, no more messages.
    });
  }
};