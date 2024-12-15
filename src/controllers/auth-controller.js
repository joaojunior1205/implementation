const { verify } = require("jsonwebtoken");
const { userRequest } = require("../app/dtos/user-dto");
const { generateToken, TOKEN_TYPE, compareToken } = require("../app/services/jwt-service");
const { createUser, doLogin } = require("../app/services/user-service");
const userMasterRepository = require("../repositories/user-master-repository");
const userRepository = require("../repositories/user-repository");
const { existsOrError } = require("../validators/validators");

const login = async (req, res) => {
    try {
        const { login, password } = userRequest(req.body);

        existsOrError(login, "login is required!");
        existsOrError(password, "password is required!");

        const response = await doLogin(login, password);

        return res.status(200).json(response);
    } catch (err) {
        console.error("Login error", err);
        return handleError(err, res);
    }
}

const register = async (req, res) => {
    try {
        const requiredProperties = ["login", "name", "password"];
        const user = userRequest(req.body);

        requiredProperties.forEach(property => existsOrError(user[property], `${property} is required`, 409));

        const created = await createUser(user);

        return res.status(200).json(created);
    } catch (err) {
        console.error("Register error", err);
        return handleError(err, res);
    }
}

const resetPassword = async (req, res) => {
    // const users = await userRepository.find({ relations: ["userMaster"] });
    // const userMaster = await userMasterRepository.find({
    //     relations: ["users"],
    // });
    // const response = { userMaster, users }

    try {
        const accessToken = await generateToken(TOKEN_TYPE.ACCESS_TOKEN, { email: "test" }, {expiresIn: 1});

        let verifyToken = null;

        verifyToken = await compareToken(TOKEN_TYPE.ACCESS_TOKEN, accessToken);
        
        return res.status(200).json({access: accessToken, verify: verifyToken});
    } catch (err) {
        handleError(err, res);
    }
}

const handleError = (err, res) => {
    if (err?.isCustomError) {
        return res.status(err.status).json(err);
    }

    return res.sendStatus(400);
}

module.exports = {
    login,
    register,
    resetPassword
}