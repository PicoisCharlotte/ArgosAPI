module.exports = server => {
    server.use(server.middlewares.bodyParser);

    require('./test')(server);
}