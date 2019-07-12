const router = require('express').Router();

module.exports = server => {
    router.get('/select', server.controllers.tokenUser.selectTokenUser);
    server.use('/tokenUser', router);
}