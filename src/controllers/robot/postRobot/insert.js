const robot = require(__basedir + '/src/models/robot');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const insertRobot = async body => {
            let idRobot = 0;
            let verify = jwtToken.checkToken(req.header('access-token'), server.get('Secret'));
            if (verify) {
                let allRobot = await robot.allRobot();
                allRobot.forEach(data => {
                    if (data.id_robot > idRobot) idRobot = data.id_robot
                });
                let checkRobotExist = allRobot.find(data => {
                    return data.name.toLowerCase() == body.name.toLowerCase()
                });
                if(checkRobotExist) {
                    res.json({message: "Robot already exist", inserted: false});
                    return;
                }
                await robot.insertRobot({
                    id_robot: largest + 1,
                    id_user_robot: body.id_user_robot,
                    model: body.model,
                    name: body.name,
                    nb_capteur: body.nb_capteur,
                }).then(() => {
                    res.status(200).json({message: "new Robot insert", inserted: true});
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
            }
            res.status(401).json({ message: " token is expired ", inserted: verify });
        }
        insertRobot(req.body);              
    }
}