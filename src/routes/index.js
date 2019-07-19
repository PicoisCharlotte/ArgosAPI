module.exports = server => {
    server.use(server.middlewares.bodyParser);

    require('./user')(server);
    require('./robot')(server);
    require('./token')(server);
    require('./notfication')(server);
}