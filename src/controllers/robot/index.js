module.exports = server => {
    return {
        selectRobot: require('./getRobot/select')(server),
        insertRobot: require('./postRobot/insert')(server),
    };
};