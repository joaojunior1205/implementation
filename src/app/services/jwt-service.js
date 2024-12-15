require('dotenv').config();
const jwt = require("jsonwebtoken");
const { customError } = require('../../validators/excaptions');
const defaultOptions = {};

const secretAccessToken = process.env.SECRET_ACCESS_TOKEN;
const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN;
const secretResetPassword = process.env.SECRET_RESET_PASSWORD;

const TOKEN_TYPE = {
    ACCESS_TOKEN: 1,
    REFRESH_TOKEN: 2,
    RESET_PASSWORD: 3,
}

const getSecret = (type) => {
    let secret = secretAccessToken;

    switch (type) {
        case TOKEN_TYPE.ACCESS_TOKEN:
            secret = secretAccessToken;
            break;
        case TOKEN_TYPE.REFRESH_TOKEN:
            secret = secretRefreshToken;
            break;
        case TOKEN_TYPE.RESET_PASSWORD:
            secret = secretResetPassword;
            break;
    }

    return secret;
}

const generateToken = (type = null, payload = {}, options = {}) => {
    if (!type) {
        return handleError(customError("type is required", 409));
    }
    
    options = { ...defaultOptions, ...options };

    secret = getSecret(type);

    try {
        return jwt.sign(payload, secret, options);
    } catch (err) {
        handleError(err);
    }
}

const compareToken = (type = null, token = null) => {
    if (!type) {
        return handleError(customError("type is required", 409));
    }

    secret = getSecret(type);

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        handleError(err);
    }
}

const handleError = (err) => {
    if (err?.isCustomError) {
        return err;
    }

    return customError(`${err?.name} - ${err?.message}`, 400);
}

module.exports = {
    generateToken,
    compareToken,
    TOKEN_TYPE,
}