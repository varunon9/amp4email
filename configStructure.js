// Add your gmail (sender) account details here and rename this file to config.js
// you also need to enable less secure settings for your gmail account.
// Link- https://myaccount.google.com/lesssecureapps?utm_source=google-account&utm_medium=web

module.exports = {
  prod: {
    gmailAccount: {
      user: 'your@email',
      password: 'your-password',
      service: 'Gmail'
    },
    port: 3600,
    url: 'http://localhost:3600/'
  },
  dev: {
    gmailAccount: {
      user: 'your@email',
      password: 'your-password',
      service: 'Gmail'
    },
    port: 3600,
    url: 'http://localhost:3600/'
  }
}