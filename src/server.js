require("dotenv").config();
const express = require("express");

const Book = require("./books/model");

const Genre = require("./genres/model");

const Author = require("./authors/model");

const bookRouter = require("./books/routes");

const genreRouter = require("./genres/routes");

const authorRouter = require("./authors/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(bookRouter);

app.use(genreRouter);

app.use(authorRouter);

const syncTables = async () => {
  Genre.hasOne(Book);
  Book.belongsTo(Genre);
  Author.hasMany(Book);
  Book.belongsTo(Author);

  Genre.sync();
  Author.sync();
  Book.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
