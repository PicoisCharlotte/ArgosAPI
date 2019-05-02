const router = require('express').Router();

module.exports = server => {
    router.get('/select', server.controllers.user.selectUser);
    router.post('/insert', server.controllers.user.insertUser);
    server.use('/user', router);
}