const express = require('express');
const server = express();
const cors = require('cors');
const key = require('./src/utils/key/secret')

const ports = process.env.PORT || 3003;
global.__basedir = __dirname;

server.use(cors());
server.set('Secret', key.Secret);

require('./src/utils/firebase/dbConnect')(server);
require('./src/controllers')(server);
require('./src/middlewares')(server);
require('./src/routes')(server);

server.use((req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.send({ error: `Route ${req.url} doesn't exist` });
        return;
    }
});

server.listen(ports);

console.log(`Server is running on port ${ports}`);
