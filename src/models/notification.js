let request = require('request');
const url = "https://fcm.googleapis.com/fcm/send";

class Notification {
    static async sendNotificationFirebase(headers, body) {
        return new Promise(async (resolve, reject) => {
            request.post({
                url, url,
                headers: headers,
                body: body,
                json: true,
            }, (error, response, body) => {
                if(error) {
                    reject(error);
                }
                resolve(body);
            })
        })
    }
}

module.exports = Notification;