const express = require("express");
const authRouter = express.Router();

const {
  registerValidation,
  loginValidation,
} = require("../middleware/authvalidation");

const { login, register, users } = require("../controller/auth");
const verifyToken = require("../middleware/auth");

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", loginValidation, login);
authRouter.get("/users", verifyToken, users);

module.exports = authRouter;
