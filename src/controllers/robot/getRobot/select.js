/* global __basedir */
const robot = require(__basedir + '/src/models/robot');

module.exports = () => {
    return (req, res) => {
        const selectAllRobot = async () => {
            await robot.allRobot().then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
        }
        const selectWhereRobot = async (idUserRobot) => {
            await robot.allRobot().then(data => {
                let findRobots = data.filter(r => {
                    return r.id_user_robot === +idUserRobot
                });
                res.status(200).json(findRobots);
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
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