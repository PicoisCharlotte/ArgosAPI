/* global __basedir */
const user = require(__basedir + '/src/models/user');

module.exports = () => {
    return (req, res) => {
        const insertUser = async (body) => {
            let idUser = [];
            await user.allUsers().then(u => {
                u.forEach(data => idUser.push(data.id_user));
            });
            let largest = Math.max.apply(Math, idUser);
            if(!body) {
                res.json({error: 'body data required'});
                return;
            }
            await user.insertUser({
                cellphone: body.cellphone,
                email: body.email,
                id_user: largest + 1,
                login: body.email,
                password: body.password
            }).then(() => {
                res.status(200).json('new User insert');
            }).catch(err => {
                res.status(err.code || 500).json(err);
            });
        }
        insertUser(req.body);
    }
}