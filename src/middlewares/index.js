module.exports = server => {
    server.middlewares = {
      bodyParser: require('./bodyParser')(server),
    };
  };
  