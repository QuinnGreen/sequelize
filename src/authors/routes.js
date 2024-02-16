const { Router } = require("express");
const authorRouter = Router();

const {
  addAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
  getAllBooksByAuthor,
} = require("./controllers");

authorRouter.post("/authors/addAuthor", addAuthor);

// get all authors
authorRouter.get("/authors/getAllAuthor", getAllAuthor);

// update book author
authorRouter.put("/authors/updateAuthor", updateAuthor);
// delete a single book by title

authorRouter.delete("/authors/deleteAuthor", deleteAuthor);

// GET - gets a single author by author name and retrieves associated books

authorRouter.get("/authors/getAllBooksByAuthor", getAllBooksByAuthor);

module.exports = authorRouter;
