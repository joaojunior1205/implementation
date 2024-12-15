function customError(msg, status) {
    const error = new Error(msg);

    error.status = status;
    error.msg = msg;
    error.isCustomError = true;

    throw error;
}

module.exports = {
    customError
}