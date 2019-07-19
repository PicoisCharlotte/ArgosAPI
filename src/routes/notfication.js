const router = require('express').Router();

module.exports = server => {
    router.post('/send', server.controllers.notification.sendNotificationFirebase);
    server.use('/notification', router);
}