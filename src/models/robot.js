const firebase = require('firebase');
const database = firebase.database();

class Robot {
    static async allRobot() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('robot');
            rootRef.on('value', data => {
                resolve(data.val());
            }, err => {
                reject(err);
                throw new Error(err);
            })
        })

    }
    static async insertRobot(data) {
        return new Promise(async (resolve, reject) => {
            let keyRefRobot = await this.getKeySnapRobot();
            let largest = Math.max.apply(Math, keyRefRobot);
            let rootRef = database.ref('robot/' + (largest + 1));
            rootRef.set(data).then(resolve, reject);
        })
    }
    static async deleteRobot(key) {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('robot/' + key);
            rootRef.remove().then(resolve, reject);
        })
    }
    static async getKeySnapRobot() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('robot');
            rootRef.on('value', snapshot => {
                resolve(Object.keys(snapshot.val()));
            })
        })
    }
}

module.exports = Robot;