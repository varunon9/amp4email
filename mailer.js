const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = {
  sendEmail: async function(account, params) {

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
        },
        logger: true, // log to console
        debug: true // include SMTP traffic in the logs
      });
    } else {
      smtpTransport = nodemailer.createTransport({
        service: account.service, // sets automatically host, port and connection security settings
        auth: {
          user: account.user,
          pass: account.password
        },
        logger: true, // log to console
        debug: true // include SMTP traffic in the logs
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

    let info;

    try {
      info = smtpTransport.sendMail(mailOptions);
      smtpTransport.close(); // shut down the connection pool, no more messages.
      return info;
    } catch (error) {
      throw error;
    }
  }
};