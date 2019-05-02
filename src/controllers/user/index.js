module.exports = server => {
    return {
        selectUser: require('./getUser/select')(server),
        insertUser: require('./postUser/insert')(server),
    };
};