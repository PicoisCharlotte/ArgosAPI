/* global __basedir */
const robot = require(__basedir + '/src/models/robot');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const selectAllRobot = async () => {
            await robot.allRobot().then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
        }
        const selectWhereRobot = async idUserRobot => {
            let verify = jwtToken.checkToken(req.header('access-token'), server.get('Secret'));
            if (verify) {
                await robot.allRobot().then(data => {
                    let findRobots = data.filter(r => {
                        return r.id_user_robot === +idUserRobot
                    });
                    res.status(200).json(findRobots);
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
            } else {
                res.status(401).json({ message: " token is expired ", access: verify });
            }
        }
        switch (req.query.action) {
            case 'selectAllRobot':
                selectAllRobot();
                break;
            case 'selectWhereRobot':
                let idUserRobot = req.query.idUserRobot;
                selectWhereRobot(idUserRobot);
                break;
        };
    }
}