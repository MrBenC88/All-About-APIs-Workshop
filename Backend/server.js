const app = require('./app');
const config = require('./utils/config');
const http = require('http');

// initialize server to run express app
const server = http.createServer(app);

// boot up server
server.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
})
