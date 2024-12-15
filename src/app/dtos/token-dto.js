const { existsOrError } = require("../../validators/validators")

const tokenResponse = (token) => {
    existsOrError(token, "token invalid", 400);

    const response = {
        token: token.token ?? null,
        type: token.type ?? null
    }

    return response;
}

module.exports = {
    tokenResponse
}