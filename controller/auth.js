const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const verifyEmail = await userModel.findOne({ email: email });

  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already used",
      });
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userModel({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash,
          phoneNumber: phoneNumber,
        });

        user
          .save()
          .then((response) => {
            return res.status(201).json({
              message: "user successfully created!",
              result: response,
              success: true,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let getUser;

  userModel
    .findOne({
      email: email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      getUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: getUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          accessToken: jwtToken,
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        messgae: err.message,
        success: false,
      });
    });
});

const users = asyncHandler(async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
    return res.status(200).json({
      data: users,
      sucess: true,
      message: "All the users available",
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
});

module.exports = {
  register,
  login,
  users,
};
