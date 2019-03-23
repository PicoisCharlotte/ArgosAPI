const bodyParser = require('body-parser');

module.exports = server => {
  server.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
  return (req, res, next) => next();
};
