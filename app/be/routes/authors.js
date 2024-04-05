const express = require("express");
const author = express.Router();
// Prendo dalla cartella models il modello utenti
const AuthorsModel = require("../models/authors");
const multer = require("multer");

// Configurazione base diskstorage
const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Creazione suffisso unico per il file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file.originalname);
    // Recupero dell'estensione originale del file
    const fileExtension = file.originalname.split(",");
    // Composizione dell'intero nome del file
    cb(null, `${file.fieldname}+${uniqueSuffix}.${fileExtension}`);
  },
});
// Dichiariamo cosa usare come storage
// Middleware da usare nelle rotte
const upload = multer({ storage: internalStorage });

// GET
author.get("/getAuthors", async (request, response) => {
  const { page = 1, pageSize = 5 } = request.query;

  try {
    const authors = await AuthorsModel.find() // .find ritorno tutto quello che c'è nella collection 'users'
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ firstName: -1 });

    const totalAuthors = await AuthorsModel.countDocuments();
    response.status(200).send({
      currentPage: +page,
      totalPages: Math.ceil(totalAuthors / pageSize),
      authors,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// GET ID
author.get("/getAuthor/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await AuthorsModel.findById(id); // .find ritorno tutto quello che c'è nella collection 'users'

    if (!author) {
      response.status(404).send({
        statusCode: 404,
        message: "The requested author doesn't exist",
      });
    }
    response.status(200).send(author);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
// POST upload Img
author.post("/author/uploadImg", upload.single("avatar"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host"); // https://hostname
  try {
    const imgUrl = req.file.filename; // Riceviamo all'interno dell'oggetto file la nostra img (filename)
    res.status(200).json({ sourceImg: `${url}/uploads/${imgUrl}` });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "File upload error",
    });
  }
});

// POST
author.post("/createAuthor", async (req, res) => {
  const newAuthor = new AuthorsModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: Date(req.body.birthday),
    avatar: req.body.avatar,
  });
  console.log(req.body);

  try {
    const authorToSave = await newAuthor.save();

    res.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno server",
    });
  }
});

// PATCH
author.patch("/updateAuthor/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await AuthorsModel.findById(id);
    if (!author) {
      response.status(404).send({
        statusCode: 404,
        message: "The requested author doesn't exist",
      });
    }

    const updatedData = request.body;
    // Quando il documento è stato aggiornato ci ritorni le ultime modifiche fatte
    const options = { new: true }; // Ritorna il nuovo documento
    const result = await AuthorsModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// DELETE
author.delete("/deleteAuthor/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const author = await AuthorsModel.findByIdAndDelete(id);
    if (!author) {
      response.status(404).send({
        statusCode: 404,
        message: "The requested author doesn't exist",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: `Author with id ${id} successfully remove`,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// GET by Name :query
author.get("/getAuthors/byName/:query", async (request, response) => {
  const { query } = request.params;

  try {
    const author = await AuthorsModel.find({
      firstName: {
        $regex: ".*" + query + ".*",
        $options: "i",
      },
    });
    if (!author) {
      response.status(404).send({
        statusCode: 404,
        message: "Author not found with the given query",
      });
    }
    response.status(200).send(author);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = author;
