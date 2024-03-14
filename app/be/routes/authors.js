const express = require("express");
const router = express.Router();
// Prendo dalla cartella models il modello utenti
const AuthorsModel = require("../models/authors");

router.get("/getAuthors", async (request, response) => {
  try {
    const authors = await AuthorsModel.find(); // .find ritorno tutto quello che c'è nella collection 'users'
    response.status(200).send(authors);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getAuthor/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const author = await AuthorsModel.findById(id); // .find ritorno tutto quello che c'è nella collection 'users'
    response.status(200).send(author);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createAuthor", async (request, response) => {
  const newAuthor = new AuthorsModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    birthday: Date(request.body.birthday),
    avatar: request.body.avatar,
  });
  try {
    // Salvo l'utente
    const authorToSave = await newAuthor.save();
    response.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;