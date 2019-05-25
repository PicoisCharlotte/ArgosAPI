/* global __basedir */
const user = require(__basedir + '/src/models/user');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const insertUser = async body => {
            let idUser = 0;
            let verify = jwtToken.checkToken(req.header('access-token'), server.get('Secret'));
            if (verify) {
                let allUser = await user.allUsers();
                allUser.forEach(data => {
                    if (data.id_user > idUser) idUser = data.id_user
                });
                let checkUserExist = allUser.find(data => {
                    return data.login.toLowerCase() == body.login.toLowerCase() || 
                    data.password.toLowerCase() == body.password.toLowerCase()
                });
                if(checkUserExist) {
                    res.json({message: "Login or password already exist", inserted: false});
                    return;
                }
            await user.insertUser({
                    cellphone: body.cellphone,
                    email: body.email,
                    id_user: idUser + 1,
                    login: body.email,
                    password: body.password,
                }).then(() => {
                    res.status(200).json({message: "new User insert", inserted: true});
                }).catch(err => {
                    res.status(err.code || 500).json(err);
                });
                return;
            }
            res.status(401).json({ message: " token is expired ", inserted: verify });
            
        }
        insertUser(req.body);
    }
}