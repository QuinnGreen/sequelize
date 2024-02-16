const { Router } = require("express");
const genreRouter = Router();

const {
  addGenre,
  getAllGenres,
  updateGenre,
  deleteGenre,
} = require("./controllers");

genreRouter.post("/genre/addGenre", addGenre);

// get all books
genreRouter.get("/genre/getAllGenres", getAllGenres);

// update book author
genreRouter.put("/genre/updateGenre", updateGenre);
// delete a single book by title

genreRouter.delete("/genre/deleteGenre", deleteGenre);

module.exports = genreRouter;
