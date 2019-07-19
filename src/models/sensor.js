
let request = require('request');

class Sensor {
    static async getValuesMotion(adafruitKey) {
        let options = {
            headers: { 'X-AIO-Key': adafruitKey }
        }
        return new Promise(async (resolve, reject) => {
            request('https://io.adafruit.com/api/v2/Titi78/feeds/argos-feed.capteur-mouvement', options,
            (error, response, body) => {
                if(error) {
                    reject(error);
                }
                resolve({
                    data: JSON.parse(body),
                    statusCode: response && response.statusCode,
                });
            });
        })
    }
}

module.exports = Sensor;