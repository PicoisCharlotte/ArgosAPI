const router = require('express').Router();

module.exports = server => {
  router.get('/ee', server.controllers.test.test);
  server.use('/test', router);
};
