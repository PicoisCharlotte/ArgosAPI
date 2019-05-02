const router = require('express').Router();

module.exports = server => {
    router.get('/select', server.controllers.robot.selectRobot);
    router.post('/insert', server.controllers.robot.insertRobot);
    server.use('/robot', router);
}