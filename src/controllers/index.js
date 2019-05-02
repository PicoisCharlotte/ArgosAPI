module.exports = server => {
    server.controllers = {
        user: require('./user')(server),
        robot: require('./robot')(server),
    }
}