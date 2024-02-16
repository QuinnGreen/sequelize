const Author = require("./model");
const Book = require("../books/model");

const addAuthor = async (req, res) => {
  try {
    // console.log(req.body);
    const author = await Author.create({
      author: req.body.author,
    });

    res
      .status(201)
      .json({ message: `${author.author} was added`, author: author });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const authors = await Author.findAll({});
    res.send({ message: "Success: All authors retrieved", authors: authors });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to retrieve authors" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = req.body.author;
    const updatedAuthor = req.body.updatedAuthor;

    // Find the genre by name
    const foundAuthor = await Author.findOne({ where: { author: author } });

    if (!foundAuthor) {
      return res.status(404).send({ message: "Error: Author not found" });
    }

    // Update the genre
    await foundAuthor.update({ author: updatedAuthor });

    res.send({ message: "Success: Author updated", author: updatedAuthor });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to update author" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = req.body.author;

    // Find the book by title and delete it
    const deletedAuthor = await Author.destroy({ where: { author: author } });

    if (!deletedAuthor) {
      return res.status(404).send({ message: "Error: author not found" });
    }

    res.send({ message: "Success: author deleted", author: deletedAuthor });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to delete author" });
  }
};

const getAllBooksByAuthor = async (req, res) => {
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
module.exports = {
  addAuthor: addAuthor,
  getAllAuthor: getAllAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
  getAllBooksByAuthor: getAllBooksByAuthor,
};
