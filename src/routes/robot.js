const router = require('express').Router();

module.exports = server => {
    router.get('/select/:idUserRobot', server.controllers.robot.selectRobot);
    router.post('/insert', server.controllers.robot.insertRobot);
    router.delete('/delete', server.controllers.robot.deleteRobot);
    server.use('/robot', router);
}