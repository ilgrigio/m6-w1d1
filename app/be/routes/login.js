const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

login.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).send({
        statusCode: 404,
        message: "User does not exists",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(401).send({
        statusCode: 401,
        message: "Password is not valid",
      });
    }
    const token = jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.header("authorization", token).status(200).send({
      message: "Login successful",
      statusCode: 200,
      token,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error" + error,
    });
  }
});
module.exports = login;
