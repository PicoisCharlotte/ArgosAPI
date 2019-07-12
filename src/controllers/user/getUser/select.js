/* global __basedir */
const user = require(__basedir + '/src/models/user');
const robot = require(__basedir + '/src/models/robot');
const tokenModel = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const selectAUser = async (credential) => {
            let token = null;
            let users = await user.allUsers();
            let aUser = users.filter(u => u.login === credential[0] && u.password === credential[1]);
            
            if (aUser.length > 0) {
                let tokenIsExpired = jwtToken.checkTokenIsExpired(req.header('access-token'), server.get('Secret'));
                
                //generate a new token if expired
                if (tokenIsExpired) {
                    token = jwtToken.generateToken({id_user: aUser[0].id_user}, server.get('Secret'));
                }
                //update ou insert a new token
                await tokenModel.changeToken({ 
                    idUser: aUser[0].id_user, 
                    token: !token ? req.header('access-token') : token
                });
                
                res.status(200).json({ data: aUser, message: !tokenIsExpired ? '' : 'new token initialized'});
                return;
            } else {
                res.status(401).json({ message: 'login or password incorrect'})
            }
        }
        
        let credential = JSON.parse(req.query.credential);
        selectAUser(credential);
    }
}
