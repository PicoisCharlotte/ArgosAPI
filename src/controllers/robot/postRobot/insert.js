const robot = require(__basedir + '/src/models/robot');
const token = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const insertRobot = async body => {
            let idRobot = 0;
            let tokenUser = await token.tokenUser(body.id_user_robot);
            let valueToken = (tokenUser) ? tokenUser.value : '';
            let verifyTokenSend = (req.header('access-token') && valueToken == req.header('access-token')) ? true : false;
            let tokenIsExpired = jwtToken.checkTokenIsExpired(req.header('access-token'), server.get('Secret'));

            if (!tokenIsExpired && verifyTokenSend) {
                let allRobot = await robot.allRobot();
                allRobot.forEach(data => {
                    if (data.id_robot > idRobot) idRobot = data.id_robot
                });
                
                let checkRobotExist = allRobot.find(data => data.name.toLowerCase() == body.name.toLowerCase());

                if(checkRobotExist) {
                    res.json({message: "Robot already exist", inserted: false});
                    return;
                }

                await robot.insertRobot({
                    id_robot: idRobot + 1,
                    id_user_robot: body.id_user_robot,
                    model: body.model,
                    name: body.name,
                    nb_capteur: body.nb_capteur,
                }).then(() => {
                    res.status(200).json({message: "new Robot insert", inserted: true});
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
            } else {
                res.status(401).json({ message: " token is expired or bad token "});
            }
        }
        insertRobot(req.body);              
    }
}