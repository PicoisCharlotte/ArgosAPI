module.exports = server => {
    server.controllers = {
        test: require('./test')(server)
    }
}