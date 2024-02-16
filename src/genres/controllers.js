const Genre = require("./model");

const addGenre = async (req, res) => {
  try {
    // console.log(req.body);
    const genre = await Genre.create({
      genre: req.body.genre,
    });

    res.status(201).json({ message: `${genre.genre} was added`, genre: genre });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({});
    res.send({ message: "Success: All genres retrieved", genres: genres });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to retrieve genres" });
  }
};

const updateGenre = async (req, res) => {
  try {
    const genre = req.body.genre;
    const updatedGenre = req.body.updatedGenre;

    // Find the genre by name
    const foundGenre = await Genre.findOne({ where: { genre: genre } });

    if (!foundGenre) {
      return res.status(404).send({ message: "Error: Genre not found" });
    }

    // Update the genre
    await foundGenre.update({ genre: updatedGenre });

    res.send({ message: "Success: Genre updated", genre: updatedGenre });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to update genre" });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genre = req.body.genre;

    // Find the book by title and delete it
    const deletedGenre = await Genre.destroy({ where: { genre: genre } });

    if (!deletedGenre) {
      return res.status(404).send({ message: "Error: genre not found" });
    }

    res.send({ message: "Success: genre deleted", genre: deletedGenre });
  } catch (error) {
    res.status(500).send({ message: "Error: Unable to delete genre" });
  }
};
module.exports = {
  addGenre: addGenre,
  getAllGenres: getAllGenres,
  updateGenre: updateGenre,
  deleteGenre: deleteGenre,
};
