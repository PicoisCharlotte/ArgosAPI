const robot = require(__basedir + '/src/models/robot');

module.exports = () => {
    return (req, res) => {
        const insertRobot = async (body) => {
            let idRobot = [];
            await robot.allRobot().then(r => {
                r.forEach(data => idRobot.push(data.id_robot));
            });
            let largest = Math.max.apply(Math, idRobot);
            if(!body) {
                res.json({error: 'body data required'});
                return;
            }
            await robot.insertRobot({
                id_robot: largest + 1,
                id_user_robot: body.id_user_robot,
                model: body.model,
                name: body.name,
                nb_capteur: body.nb_capteur,
            }).then(() => {
                res.status(200).json('new Robot insert');
            }).catch(err => {
                res.status(error.code || 500).json(error);
            });
        }
        insertRobot(req.body);              
    }
}