const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const users = require("../models/users");

// GET
router.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// POST
router.post("/createUser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserModel({
    userName: req.body.userName,
    password: hashedPassword,
    email: req.body.email,
    age: Number(req.body.age),
    role: req.body.role,
  });
  try {
    const userToSave = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      payload: userToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// DELETE
router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({
        statusCode: 404,
        message: "The requested user doesn't exist",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `User with id ${id} successfully remove`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
module.exports = router;
