const BCRYPT = require('bcrypt')

const CREATE_PASSWORD = async () => {

    const CARACS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#'
    let password = ''

    //CREATE A UNIQUE STRING PATH
    for (i = 0; i < 12; i++) {
        let char = Math.floor(Math.random() * CARACS.length + 1);
        password += CARACS.charAt(char)
    }

    const SALT = await BCRYPT.genSalt(10)
    const HASH = await BCRYPT.hash(password, SALT)

    let response = {
        password: password,
        hash: HASH,
        
    }

    return response

}

module.exports = CREATE_PASSWORD