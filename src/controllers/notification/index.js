module.exports = server => {
    return {
        sendNotificationFirebase: require('./firebase/notficationFirebase')(server),
    };
};