const robot = require(__basedir + '/src/models/robot');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const deleteRobot = async body => {
            let keyRobot = null;
            let verify = jwtToken.checkToken(req.header('access-token'), server.get('Secret'));
            if (verify) {
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
            }
            res.status(401).json({ message: " token is expired ", deleted: verify });
            
        };
        deleteRobot(req.body);
    }
}