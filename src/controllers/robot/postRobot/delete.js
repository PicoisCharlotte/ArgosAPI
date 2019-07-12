const robot = require(__basedir + '/src/models/robot');
const token = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const deleteRobot = async body => {
            let keyRobot = null;
            let tokenUser = await token.tokenUser(body.id_user_robot);
            let valueToken = (tokenUser) ? tokenUser.value : '';
            let verifyTokenSend = (req.header('access-token') && valueToken == req.header('access-token')) ? true : false;
            let tokenIsExpired = jwtToken.checkTokenIsExpired(req.header('access-token'), server.get('Secret'));

            if (!tokenIsExpired && verifyTokenSend) {
                await robot.allRobot().then(r => {
                    r.find((data, index) => {
                        if (data.id_robot == body.id_robot) keyRobot = index;
                    })
                });

                if (!keyRobot) {
                    res.status(404).json({message: "key robot don't exist", deleted: false});
                    return;
                }

                await robot.deleteRobot(keyRobot).then(() => {
                    res.status(200).json({message: "Robot deleted", deleted: true});
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
            } else {
                res.status(401).json({ message: " token is expired or bad token" });
            }
        };
        deleteRobot(req.body);
    }
}