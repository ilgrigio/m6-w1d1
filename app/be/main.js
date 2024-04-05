const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// Richiedere libreria "dotenv"
require("dotenv").config();

// Stabilire la PORTA del SERVER
const PORT = 3030;

// Utilizzare tutti i metodo framework Express
const app = express();

// import delle Routes
const authorsRoute = require("./routes/authors");
const blogPostsRoute = require("./routes/blogPosts");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");

// middleware (tra una request e response) che permette la lettura dei json
app.use(cors());
app.use(express.json());
// Dichiaro la rotta per il get delle img su uploads tramite express.static middleware
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/", authorsRoute);
app.use("/", blogPostsRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);

// Creo un endpoint
// app.get("/getUsers", (request, response) => {
//   response.status(200).send({
//     title: "Andrea",
//     isServerActive: true,
//   });
// });

// app.post("/createUser", (request, response) => {});

// app.patch("/updateUser", (request, response) => {});

// app.delete("/deleteUser", (request, response) => {});

// Connessione del database
mongoose.connect(process.env.MONGODB_URL);
// mongoose.connect(
//   "mongodb+srv://andsattin:H5JPZozD35Lhzg4q@db-epicode.0sf8iq3.mongodb.net"
// );

const db = mongoose.connection;

// Verifico se c'è un errore nella connessione
db.on("error", console.error.bind(console, "DB connection error"));
// Ascolto una volta sola l'evento di apertura
db.once("open", () => {
  console.log("Database successfuly connected");
});

// Mettere in ascolto il nostro SERVER sulla PORTA stabilita
app.listen(PORT, () =>
  console.log(`Server connected and listening on port ${PORT}`)
);
