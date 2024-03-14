// Richiamo libreria mongoose
const mongoose = require("mongoose");

// Creo uno schema Utente
const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: false,
      min: 8,
    },
    avatar: {
      type: String,
      required: false,
      // default: 0,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("authorModel", authorSchema, "author");
