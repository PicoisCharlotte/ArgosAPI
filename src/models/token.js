const firebase = require('firebase');
const database = firebase.database();

class Token {
    static async allToken() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('token');
            rootRef.on('value', data => resolve(data.val()), err => reject(err));
        })

    }

    static async tokenUser(idUser) {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('token');
            rootRef.on('value', data => {
                let  tokens = data.val();
                let tokenUser = tokens.filter(token => token.idUser === +idUser);
                let verify = tokenUser.length > 0 ? tokenUser[0] : undefined;
                resolve(verify);
            }, err => {
                reject(err);
                throw new Error(err);
            })
        })
    }
    static async changeToken(data) {
        let tokenUser = await this.tokenUser(data.idUser);
        let allToken = await this.allToken();
        let newIdToken = 0;

        allToken.forEach(token => {
            if (token.id > newIdToken) newIdToken = token.id;
        })

        if(!tokenUser) {
            //insert new token user
            await this.insertToken({
                id: newIdToken + 1,
                idUser: data.idUser,
                value: data.token
            })
        } else {
            //if oldtoken !== tokenSend update
            if (tokenUser.value !== data.token) {
                await this.updateToken(data.token, allToken, tokenUser);
                return;
            }
            return;
        }
    }

    static async insertToken(data) {
        return new Promise(async (resolve, reject) => {
            let keyRefToken = await this.getKeySnapToken();
            let largest = Math.max.apply(Math, keyRefToken);
            let rootRef = database.ref('token/' + (largest + 1));
            rootRef.set(data).then(resolve, reject);
        })
    }

    static async updateToken(newToken, tokens, tokenUser) {
        let index = tokens.findIndex(token => token.id === tokenUser.id);
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('token/' + index);
            rootRef.set({ id: tokenUser.id, idUser: tokenUser.idUser, value: newToken })
            .then(resolve, reject);
        })
    }

    static async getKeySnapToken() {
        return new Promise(async (resolve, reject) => {
            let rootRef = database.ref('token');
            rootRef.on('value', snapshot => {
                resolve(Object.keys(snapshot.val()));
            }, err => {
                reject(err);
                throw new Error(err);
            });
        })
    }
}

module.exports = Token;