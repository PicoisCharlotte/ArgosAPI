/* global __basedir */
const robot = require(__basedir + '/src/models/robot');
const token = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const selectWhereRobot = async idUserRobot => {
            let tokenUser = await token.tokenUser(idUserRobot);
            let valueToken = (tokenUser) ? tokenUser.value : '';
            let verifyTokenSend = (req.header('access-token') && valueToken == req.header('access-token')) ? true : false;
            let verifyTokenExpired = jwtToken.checkTokenIsExpired(req.header('access-token'), server.get('Secret'));
            
            if (!verifyTokenExpired && verifyTokenSend) {
                await robot.allRobot().then(data => {
                    let findRobots = data.filter(r => {
                        return r.id_user_robot === +idUserRobot
                    });
                    res.status(200).json(findRobots);
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
            } else {
                res.status(401).json({ message: "token is expired or bad token", tokenSend: verifyTokenSend });
            }
        }
        selectWhereRobot(req.params.idUserRobot);     
    }
}