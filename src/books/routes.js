const { Router } = require("express");
const bookRouter = Router();

const {
  addBook,
  getAllBooks,
  updateAuthor,
  deleteBook,
  getBookByAuthor,
  addManyBooks,
  deleteAll,
  getSingleBookByTitle,
} = require("./controllers");

bookRouter.post("/books/addBook", addBook);

bookRouter.post("/books/addManyBooks", addManyBooks);

// get all books
bookRouter.get("/books/getAllBooks", getAllBooks);

bookRouter.get("/books/getSingleBookByTitle/:title", getSingleBookByTitle);

// GET - gets a book by author
bookRouter.get("/books/getBookByAuthor", getBookByAuthor);

// update book author
bookRouter.put("/books/updateAuthor", updateAuthor);
// delete a single book by title

bookRouter.delete("/books/delete", deleteBook);

// DELETE - deletes all books

bookRouter.delete("/books/deleteAll", deleteAll);

module.exports = bookRouter;
