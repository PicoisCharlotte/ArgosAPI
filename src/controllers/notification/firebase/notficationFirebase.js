/* global __basedir */
const sensor = require(__basedir + '/src/models/sensor');
const notification = require(__basedir + '/src/models/notification');
let notficationCount = 0;

module.exports = server => {
    return (req, res) => {
        const sendNotfication  = async body => {
            let motion = await sensor.getValuesMotion(server.get('adafruitKey'));
            let tokenF = server.get("tokenF");
            let headers = { 'Authorization': tokenF };
            //check last value
            if(body && parseInt(motion.data.last_value, 10) == 1) {
                //check if notfication already send
                if(notficationCount < 1) {
                    //send notfication
                    await notification.sendNotificationFirebase(headers, body).then(() => {
                        res.status(200).json({message: "notfication send"});
                    }).catch(err => {
                        res.status(err.code || 500).json(err);
                    });
                } else {
                    res.status(200).json({message: "notification already send"});
                }
                notficationCount++;
            } else {
                notficationCount = 0;
                res.status(404).json({message: "body inexistante or mouvement sensor not detect mouvement"});
            }
        }
        sendNotfication(req.body);
    }
}