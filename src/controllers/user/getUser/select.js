/* global __basedir */
const user = require(__basedir + '/src/models/user');
const robot = require(__basedir + '/src/models/robot');

module.exports = () => {
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
            await user.allUsers().then(data => {
                if(!credential[0] || !credential[1]) {
                    res.json({error: 'Login or password required'});
                    return;
                }
                let aUser = data.filter(u => u.login === credential[0] && u.password === credential[1]);
                res.status(200).json(aUser);
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
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
