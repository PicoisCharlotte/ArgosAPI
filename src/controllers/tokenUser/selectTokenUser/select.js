/* global __basedir */
const token = require(__basedir + '/src/models/token');
const jwtToken = require(__basedir + '/src/utils/token');

module.exports = server => {
    return (req, res) => {
        const getToken = async (idUser) => {
            let tokenUser = await token.tokenUser(idUser);
            let newToken = null;
            
            if (tokenUser) {
                let tokenIsExpired = jwtToken.checkTokenIsExpired(req.header('access-token'), server.get('Secret'));
                
                //if token is expired, generate a new token
                if(tokenIsExpired) {
                    newToken = jwtToken.generateToken({id_user: tokenUser.idUser}, server.get('Secret'));
                }

                //update or not the new token
                await token.changeToken({ 
                    idUser: tokenUser.idUser, 
                    token: !newToken ? req.header('access-token') : newToken
                });
                
                //display new token or old token
                res.status(200).json({ token: !newToken ? req.header('access-token') : newToken })
            } else {
                res.status(401).json({ message: ' user inexistant ', token: false })
            }
            
        };
        getToken(req.params.idUser);
    }
}