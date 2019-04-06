const fs = require('fs');

const config = require('./config');
const mailer = require('./mailer');

const sendPromotionalEmail = function(receiver) {
  // edit config.js for your gmail credentials
  const gmailAccount = config.gmailAccount;

  const params = {
    to: [receiver], // list of receivers
    subject: 'SaathMeTravel: An open source social travelling app to match'
      + ' the travellers sharing a common journey.',
    text: 'This is a dynamic email but your email client does not support it',
    html: `
      <p>This is a dynamic email.</p>
      <p>
        To check dynamic content, whitelist my email in 
        <b>
          Gmail Settings > General > Dynamic email > Dynamic email development
        </b>
      </p>
    `,
    amp: ''
  };

  // read the dynamic-email html file
  fs.readFile('./index.html', function(error, data) {
    if (error) {
      console.trace(error);
    } else {
      params.amp = data;
      mailer.sendEmail(gmailAccount, params, (error) => {
        console.error('Failed to send email');
        console.trace(error);
      }, (info) => {
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

const stdin = process.openStdin();

console.log('Sending dynamic email using amp4email-');
console.log('Enter receiver email');
stdin.addListener('data', function(data) {
  const receiverEmail = data.toString().trim();
  sendPromotionalEmail(receiverEmail);
});