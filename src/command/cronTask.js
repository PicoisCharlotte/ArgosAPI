const CronJob = require('cron').CronJob;
const sensor = require('../models/sensor');
const notification = require('../models/notification');
let nbCountNotif = 0;

class CronTask {
    static sendNotification(server) {
        let job = new CronJob('*/5 * * * * *', async function() {
            let motion = await sensor.getValuesMotion(server.get('adafruitKey'));
            let tokenF = server.get("tokenF");
            let headers = { 'Authorization': tokenF };

            if (server.get("bodyNotification") && parseInt(motion.data.last_value, 10) == 1) {
                if (nbCountNotif < 1 ) {
                    await notification.sendNotificationFirebase(headers, server.get("bodyNotification") ).then(() => {
                        console.log("notification send : " + tokenF);
                    }).catch(err => {
                        console.error(err);
                    });
                } /*else {
                    console.log("notfication already send");
                }*/
                nbCountNotif++
            } else {
                //console.log("rien");
                nbCountNotif = 0;
            }
        })
        job.start();
    }
}

module.exports = CronTask;