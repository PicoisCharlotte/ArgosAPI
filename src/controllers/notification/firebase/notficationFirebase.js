/* global __basedir */
const sensor = require(__basedir + '/src/models/sensor');
const notification = require(__basedir + '/src/models/notification');

module.exports = server => {
    return (req, res) => {
        const sendNotfication  = async body => {
            let motion = await sensor.getValuesMotion(server.get('adafruitKey'));
            let tokenF = server.get("tokenF");
            let headers = { 'Authorization': tokenF };
            //check last value
            if(body && parseInt(motion.data.last_value, 10) == 1) {
                //check if notfication already send
                if (body) {
                    server.set("bodyNotification", body);
                    res.status(200).json({message: "notfication send"});
                }
            } else {
                res.status(404).json({message: "body inexistante or mouvement sensor not detect mouvement"});
            }
        }
        sendNotfication(req.body);
    }
}