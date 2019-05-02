const firebase = require('firebase');
const database = firebase.database();

class User {
    static async allUsers() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('user');
            rootRef.on('value', data => {
                resolve(data.val());
            }, err => {
                reject(err);
                throw new Error(err);
            });
        })

    }
    static async insertUser(data) {
        return new Promise(async (resolve, reject) => {
            let keyRefUser = await this.getKeySnapUser();
            let largest = Math.max.apply(Math, keyRefUser);
            let rootRef = database.ref('user/' + (largest + 1));
            rootRef.set(data).then(resolve, reject);
        })
    }
    static async getKeySnapUser() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('user');
            rootRef.on('value', snapshot => {
                resolve(Object.keys(snapshot.val()));
            }, err => {
                reject(err);
                throw new Error(err);
            });
        })
    }
}

module.exports = User;