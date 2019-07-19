module.exports = server => {
    server.controllers = {
        user: require('./user')(server),
        robot: require('./robot')(server),
        tokenUser: require('./tokenUser')(server),
        notification: require('./notification')(server),
    }
}