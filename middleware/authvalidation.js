const validator = require("../utils/validator");

const registerValidation = async (req, res, next) => {
  const validateRule = {
    firstName: "required|string|min:3",
    lastName: "required|string|min:3",
    email: "required|string",
    password: "required|min:6",
    phoneNumber: "required|min:10|max:10",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const loginValidation = async (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:6",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  registerValidation,
  loginValidation,
};
