const firebase = require('firebase');
const dbConfig = require('./dbConfig')

async function dbInit() {
    await firebase.initializeApp(dbConfig);
    console.log('connect to firebase');
}

module.exports = dbInit;