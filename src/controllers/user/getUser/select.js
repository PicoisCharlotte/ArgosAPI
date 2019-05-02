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
            let newArray = [];
            
            allRobot.forEach(r => {
                allUser.forEach(u => {
                    if(r.id_user_robot == u.id_user) {
                        newArray.push({
                            id_user: u.id_user,
                            id_robot: r.id_robot,
                            login: u.login,
                            password: u.password,
                            email: u.email,
                            model: r.model,
                            name: r.name,
                            nbCapteur: r.nb_capteur,
                        });
                    }
                })
            });
            res.status(200).json(newArray);
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
