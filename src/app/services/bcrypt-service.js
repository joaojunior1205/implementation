const bcrypt = require('bcrypt');
const { customError } = require('../../validators/excaptions');
const saltRounds = 10;

const encrypt = async (value) => {
    try {
        return bcrypt.hash(value.toString(), saltRounds);
    } catch (err) {
        customError("Encrypt error", err)
    }
}

const compare = async (value, hash) => {
    try {
        return bcrypt.compare(value.toString(), hash);
    } catch (err) {
        customError("Compare error", err);
    }
}

module.exports = {
    encrypt,
    compare,
}