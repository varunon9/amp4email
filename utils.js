const fs = require('fs');

const config = require('./config')[process.env.NODE_ENV || 'dev'];
const mailer = require('./mailer');

const sendPromotionalEmail = async function(receiver) {
  // edit config.js for your gmail credentials
  const gmailAccount = config.gmailAccount;
  const url = config.url;

  const params = {
    to: [receiver], // list of receivers
    subject: 'Feedback | Beautiful Flowers Shop',
    text: `Please visit ${url} to rate our flowers.`,
    html: `
      <p>Please rate our flowers</p>
      <p>
        Please click this link <a href="${url}">${url}</a>
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