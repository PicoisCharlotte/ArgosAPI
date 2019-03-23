const express = require('express');
const server = express();
const cors = require('cors');

const ports = process.env.PORT || 3003;

server.use(cors());

require('./src/controllers')(server);
require('./src/middlewares')(server);
require('./src/routes')(server);

server.listen(ports);

console.log(`Server is running on port ${ports}`);
