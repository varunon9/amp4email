const fs = require('fs');

const config = require('./config');
const mailer = require('./mailer');

const sendPromotionalEmail = async function(receiver) {
  // edit config.js for your gmail credentials
  const gmailAccount = config.gmailAccount;

  const params = {
    to: [receiver], // list of receivers
    subject: 'Feedback | Beautiful Flowers Shop',
    text: 'This is a dynamic email but your email client does not support it',
    html: `
      <p>This is a dynamic email for rating our flowers.</p>
      <p>
        To check dynamic content, whitelist my email in 
        <b>
          Gmail Settings > General > Dynamic email > Dynamic email development
        </b>
      </p>
    `,
    amp: ''
  };

  try {
    // read the dynamic-email html file
    params.amp = await new Promise((resolve, reject) => {
      // path relative to app.js
      fs.readFile('./email-templates/flowers.html', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return mailer.sendEmail(gmailAccount, params);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendPromotionalEmail
};