const jwt = require('jsonwebtoken');

class Token {
    static generateToken(data, secret) {
        return jwt.sign(data, secret, {
            expiresIn: 86400
        });
    }
    static checkTokenIsExpired(token, secret) {
        return jwt.verify(token, secret, (err, decoded) => {
            if (err) return true;
            return false;
        });
    }
}

module.exports = Token;