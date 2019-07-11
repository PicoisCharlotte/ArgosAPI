/* global __basedir */
const user = require(__basedir + '/src/models/user');
const robot = require(__basedir + '/src/models/robot');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const selectAllUser = async () => {
            await user.allUsers().then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
        };
        const selectJoinRToU = async () => {
            let allUser = await user.allUsers();
            let allRobot = await robot.allRobot();
            
            allRobot.forEach(r => {
                let index = allUser.findIndex(u => r.id_user_robot == u.id_user);
                r.id_user = index == - 1 ? null : allUser[index].id_user;
                r.login = index == - 1 ? null : allUser[index].login;
                r.password = index == - 1 ? null : allUser[index].password;
                r.email = index == - 1 ? null : allUser[index].email;
            });
            res.status(200).json(allRobot);
        };
        const selectAUser = async (credential) => {
            let token = null;
            let users = await user.allUsers();
            let aUser = users.filter(u => u.login === credential[0] && u.password === credential[1]);
            if (aUser.length > 0) {
                let verify = jwtToken.checkToken(req.header('access-token'), server.get('Secret'));
                if (!verify) token = jwtToken.generateToken({id_user: aUser[0].id_user}, server.get('Secret'));
                res.status(200).json({
                    data: aUser,
                    message: verify ? '' : 'new token initialized',
                    token: token ? token : req.header('access-token')
                });
                return;
            } else {
                res.status(401).json({ message: 'login or password incorrect'})
            }
        }

        switch (req.query.action) {
            case 'selectAllUser':
                selectAllUser();
                break;
            case 'selectJoinUToR':
                selectJoinRToU();
                break;
            case 'selectAUser':
                let credential = JSON.parse(req.query.credential);
                selectAUser(credential);
                break;
        }
    }
}
