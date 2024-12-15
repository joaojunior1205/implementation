const userRequest = (user) => {
    const dtoUser = {
        name: user?.name ?? null,
        login: user?.login ?? null,
        password: user?.password ?? null,
        picture: user?.picture ?? null,
        userMasterId: user?.userMasterId ?? null,
    };

    return dtoUser;
}

const userResponse = (user) => {

}

module.exports = {
    userRequest,
    userResponse
}