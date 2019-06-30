const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

const config = require('./config')[process.env.NODE_ENV || 'dev'];
const utils = require('./utils');

// setting view engine as ejs with file extension .html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(
  bodyParser.json({
    limit: '8mb'
  })
); // support json encoded bodies

app.use(
  bodyParser.urlencoded({
    limit: '8mb',
    extended: true
  })
); // support encoded bodies

// for parsing multipart/form-data
app.use(upload.array());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('flowers');
});

app.get('/send', function(req, res) {
  const params = req.query;
  const receiverEmail = params.email;
  if (receiverEmail) {
    utils.sendPromotionalEmail(receiverEmail)
      .then(data => {
        res.json({
          success: true,
          response: {
            envelope: data.envelope,
            messageId: data.messageId
          }
        });
      })
      .catch(error => {
        res.json({
          success: false,
          message: error.message
        });
      });
  } else {
    res.json({
      success: false,
      message: 'No recipient found'
    });
  }
});

// setting response headers required by AMP for all our flowers API
app.use('/flowers', function(req, res, next) {
  // in production you can extract token from query params and validate it
  let origin = 'https://mail.google.com';
  let sourceOrigin = config.gmailAccount.user;

  // you can also validate that request came from Gmail using proxy assertion token
  //const proxyAssertionToken = req.get('Amp4Email-Proxy-Assertion');

  if (req.headers['amp-same-origin'] === 'true') {
    origin = req.query.__amp_source_origin;
    sourceOrigin = origin;
  }

  res.set({
    'Access-Control-Allow-Origin': origin,
    'AMP-Access-Control-Allow-Source-Origin': sourceOrigin,
    'Access-Control-Allow-Source-Origin':
      'AMP-Access-Control-Allow-Source-Origin',
    'Access-Control-Expose-Headers':
      'Access-Control-Allow-Origin' +
      ', AMP-Access-Control-Allow-Source-Origin' +
      ', Access-Control-Allow-Source-Origin'
  });
  next();
});

// this API will be used in amp email to fetch list of flowers
app.get('/flowers', function(req, res) {
  
  res.json({
    success: true,
    data: [
      {
        name: 'Lily',
        stars: 5,
        price: 70,
        url: config.url + 'images/lily.jpeg'
      },
      {
        name: 'Rose',
        stars: 3,
        price: 50,
        url: config.url + 'images/rose.jpeg'
      },
      {
        name: 'Marigold',
        stars: 4,
        price: 80,
        url: config.url + 'images/marigold.jpeg'
      },
      {
        name: 'Jasmine',
        stars: 5,
        price: 100,
        url: config.url + 'images/jasmine.jpeg'
      }
    ]
  });
});

// this API will be used in amp email to submit feedback for a flower type
app.post('/flowers/feedback', function(req, res) {
  const feedback = req.body;
  res.json({
    success: true,
    message: 'Thank you for your feedback.',
    feedback
  });
});

module.exports = app;
