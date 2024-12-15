const {login, register, resetPassword} = require("../controllers/auth-controller");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    return res.status(200).json({});
})

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;