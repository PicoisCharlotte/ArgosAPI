/* global __basedir */
const token = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const getToken = async (idUser) => {
            let tokenUser = await token.tokenUser(idUser);
            let checkTokenExist = (tokenUser) ? tokenUser.value : '';
            let tokenIsExpired = jwtToken.checkTokenIsExpired(checkTokenExist, server.get('Secret'));
            if(!tokenIsExpired) {
                res.status(200).json({ token: checkTokenExist });
            } else {
                res.status(401).json({ message: "token is expired or user id inexistant", token: null });
            }
        };
        getToken(req.query.idUser);
    }
}