module.exports = server => {
    return {
        selectTokenUser: require('./selectTokenUser/select')(server),
    };
};