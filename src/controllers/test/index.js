module.exports = server => {
    return {
      test: require('./test')(server),
    };
};
  