const { In } = require("typeorm");
const tokenRepository = require("../../repositories/token-repository");
const userMasterRepository = require("../../repositories/user-master-repository");
const userRepository = require("../../repositories/user-repository");
const { customError } = require("../../validators/excaptions");
const { existsOrError } = require("../../validators/validators");
const { tokenResponse } = require("../dtos/token-dto");
const { encrypt, compare } = require("./bcrypt-service");
const { generateToken, TOKEN_TYPE } = require("./jwt-service");
const moment = require("moment");

const createUserMaster = async () => {
    return userMasterRepository.save({});
};

const createUser = async (user) => {
    let userMasterId = user?.userMasterId;

    const checkEmail = await userRepository.findBy({ login: user.login });

    if (checkEmail?.length) {
        customError("E-mail já está em uso!", 409);
    }

    if (!userMasterId) {
        const userMaster = await createUserMaster();

        if (userMaster?.id) {
            userMasterId = userMaster.id;
        }
    }

    user.password = await encrypt(user.password);

    existsOrError(user.password, "Password inválida", 409);
    existsOrError(userMasterId, "Usuário master inválido", 409);

    user.userMasterId = userMasterId;

    try {
        const save = await userRepository.save(user);

        if (save?.id) {
            return save;
        }
    } catch (err) {
        await userMasterRepository.delete({ id: userMasterId });

        console.log("Error save user", err)
        throw customError("Erro ao salvar novo usuário!", 400);
    }
};

const doLogin = async (login, password) => {
    const user = await userRepository.findOne({ where: { login }, select: ['id', 'login', 'password'] });

    if (!user) {
        customError("user not found", 404);
    }

    let auth = { success: false, token: null };

    if (user.id) {
        auth.success = await compare(password, user.password);

        if (auth.success) {
            const accessToken = generateToken(TOKEN_TYPE.ACCESS_TOKEN, { id: user.id, login: user.login }, { expiresIn: '1d' });
            const refreshToken = generateToken(TOKEN_TYPE.REFRESH_TOKEN, { id: user.id, login: user.login }, { expiresIn: '30d' });

            tokens = [
                { token: accessToken, type: TOKEN_TYPE.ACCESS_TOKEN, userId: user.id, expiresAt: moment().add(1, "day") },
                { token: refreshToken, type: TOKEN_TYPE.REFRESH_TOKEN, userId: user.id, expiresAt: moment().add(30, "days") }
            ];

            try {
                await tokenRepository.update(
                    { userId: user.id, active: true, type: In([TOKEN_TYPE.ACCESS_TOKEN, TOKEN_TYPE.REFRESH_TOKEN]) },
                    { active: false, revokedAt: moment(), updatedAt: moment() }
                );

                await tokenRepository.save(tokens);
                
                let accessToken = tokens.find(t => t.type === TOKEN_TYPE.ACCESS_TOKEN);

                if (accessToken) {
                    auth.token = tokenResponse(accessToken);
                }
            } catch (err) {
                console.error("Save token erros", err);
                auth = { success: false, token: null };
            }
        }
    }

    return auth;
}

module.exports = {
    createUser,
    doLogin
}