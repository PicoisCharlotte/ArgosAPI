const jwt = require('jsonwebtoken');

class Token {
    static generateToken(data, secret) {
        return jwt.sign(data, secret, {
            expiresIn: 60
        });
    }
    static checkToken(token, secret) {
        return jwt.verify(token, secret, (err, decoded) => {
                if (err) return false;
                return true;
        });
    }
}

module.exports = Token;