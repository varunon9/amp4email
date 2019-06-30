const http = require('http');

const app = require('./app');
const config = require('./config');

const port = config.port || 3500;
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen(port, function() {
  console.info('Express server listening on port ' + server.address().port);
});

/*server.on('error', error => {
  console.error(error);
});*/