const Book = require("./model");
const Genre = require("../genres/model");
const Author = require("../authors/model");
const { param } = require("./routes");

const getSingleBookByTitle = async (req, res) => {
  const book = await Book.findOne({ where: { title: req.params.title } });
  const genre = await Genre.findOne({ where: { id: book.GenreId } });
  console.log(book);
  res.send({ book: book, genre: genre });
};

const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      GenreId: req.body.GenreId,
    });

    res.status(201).json({ message: `${book.title} was added`, book: book });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const addManyBooks = async (req, res) => {
  try {
    const booksData = req.body.books;

    if (!booksData || !Array.isArray(booksData) || booksData.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty books data in the request body." });
    }

    const createdBooks = await Book.bulkCreate(booksData);

    res.status(201).json({
      message: `${createdBooks.length} books were added`,
      books: createdBooks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ include: "Genre" });
    res.send({ message: "Success: All books retrieved", books: books });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to retrieve books" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const title = req.body.title;
    const updatedAuthor = req.body.author;

    // Find the book by title
    const book = await Book.findOne({ where: { title: title } });

    if (!book) {
      return res.status(404).send({ message: "Error: Book not found" });
    }

    // Update the author
    await book.update({ author: updatedAuthor });

    res.send({ message: "Success: Author updated", book: book });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to update author" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const title = req.body.title;

    // Find the book by title and delete it
    const deletedBook = await Book.destroy({ where: { title: title } });

    if (!deletedBook) {
      return res.status(404).send({ message: "Error: Book not found" });
    }

    res.send({ message: "Success: Book deleted", book: deletedBook });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to delete book" });
  }
};

const getBookByAuthor = async (req, res) => {
  try {
    const author = req.body.author;

    if (!author) {
      return res
        .status(400)
        .send({ message: "Author is required in the request body." });
    }

    const books = await Book.findAll({ where: { author: author } });

    if (books.length === 0) {
      return res.send({ message: `No books found for author ${author}.` });
    }

    res.send({ message: `Here are the books by ${author}`, books: books });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error: Unable to get books" });
  }
};

const deleteAll = async (req, res) => {
  try {
    await Book.destroy({
      truncate: true,
    });
    res.send({ message: "Success: All books deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to delete books" });
  }
};
module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  updateAuthor: updateAuthor,
  deleteBook: deleteBook,
  getBookByAuthor: getBookByAuthor,
  addManyBooks: addManyBooks,
  deleteAll: deleteAll,
  getSingleBookByTitle: getSingleBookByTitle,
};
