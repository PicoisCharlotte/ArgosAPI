const CronJob = require('cron').CronJob;
const sensor = require('../models/sensor');
const notification = require('../models/notification');
let nbCountNotif = 0;

class CronTask {
    static sendNotification(server) {
        let job = new CronJob('*/20 * * * * *', async function() {
            let motion = await sensor.getValuesMotion(server.get('adafruitKey'));
            let tokenF = server.get("tokenF");
            let headers = { 'Authorization': tokenF };

            if (server.get("bodyNotification") && parseInt(motion.data.last_value, 10) == 1) {
                let newBody = { "to": server.get("bodyNotification").to, "notification" :{
                    "title": "Attention",
                    "body": "Votre robot a détecté quelque chose!!"
                }}
                
                await notification.sendNotificationFirebase(headers, newBody).then(() => {
                    console.log("notification send : " + server.get("bodyNotification").to);
                }).catch(err => {
                    console.error(err);
                });
            }
        })
        job.start();
    }
}

module.exports = CronTask;