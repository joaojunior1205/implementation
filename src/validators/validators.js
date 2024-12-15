const { customError } = require("./excaptions");

function existsOrError(value, msg = "Property not found", status = 409) {
    if (!value && value !== 0){
        throw customError(msg, status);
    }

    if (Array.isArray(value) && value.length === 0) {
        throw customError(msg, status);
    }

    if (typeof value === 'string' && !value.trim()){
        throw customError(msg, status);
    }
};

function notExistsOrError(value, msg) {
    try {
        existsOrError(value, msg);
    } catch (msg) {
        return;
    }

    throw msg;
};

function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB)
        throw msg;
};

function isStringOrError(value, msg) {
    if (typeof (value) !== 'string')
        throw msg;
};

module.exports = {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    isStringOrError,
}