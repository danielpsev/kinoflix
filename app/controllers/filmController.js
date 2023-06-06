const Film = require("../models/filmModel");
const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");

exports.getAllFilms = async (req, res) => {
  const { page = 1, limit = 18, filter, sort_name, sort_type, title } = req.query;

  try {
    let filter_data = {};
    if (filter) {
      filter_data = { status: filter };
    }

    let sort = {};
    if (sort_name === 'title' || sort_name === 'releaseYear' || sort_name === 'rating' || sort_name === 'createdAt' ) {
      sort[sort_name] = sort_type;
    }
    if(!sort_name){
      sort['createdAt'] = sort_type ? sort_type : 'desc';
    }
    if (title) {
      filter_data.title = { $regex: title, $options: 'i' };
    }
    console.log(sort);
    let allFilms = await Film.find(filter_data)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const count = await Film.countDocuments(filter_data).exec();

    if (title && allFilms.length === 0) {
      return res.status(200).json({
        status: 'error',
        message: 'Film not found.'
      });
    }

    if(req.userInfo){
      const user = await User.findById(req.userInfo.id);
      allFilms = allFilms.map(film => {
        const isLiked = user.likes.some(like => like.film.toString() === film._id.toString());
        return { ...film._doc, isLiked };
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        films: allFilms,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: parseInt(page)
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.getUserLikedFilms = async (req, res) => {
  const { page = 1, limit = 12} = req.query;
  try {
    const likedFilms = await User.find()
      .populate({
        path: 'likes.film',
        model: "film",
        options: {
          limit: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit),
        },
      })
      .exec();
      const films = likedFilms
      .map((user) =>
        user.likes.map((like) => ({
          ...like.film._doc,
          isLiked: true,
        }))
      ).flat();
      const count = await User.countDocuments().exec();
    res.status(200).json({
      status: 'success',
      data: {
        films: films,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: parseInt(page)
      }
    });
} catch (err) {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}
}
exports.getFilm = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ status: "error", mess: `Blogai nurodytas ID` });
      }
    try {
      const film = await Film.findById(id);
      if (!film) {
        return res.status(404).json({ status: "error", mess: `Filmas, id: ${id} neegzistuoja` });
      } else {
        let isLiked = false;
        if(req.userInfo){
          const user = await User.findById(req.userInfo.id);
          isLiked = user.likes.some(like => like.film === id);
        }
        const { likes, ...filmData } = film._doc;
        const data = {...filmData, isLiked};
        res.status(200).json(data);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", mess: err.message });
    }
  };

exports.addFilm = async (req, res) => {
  try {
    const newFilm = await Film.create({...req.body});
    res.status(201).json(newFilm);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: "error", mess: err });
  }
};


exports.likeFilm = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ status: "error", mess: `Blogai nurodytas ID` });
    }

    const film = await Film.findById(id);
    if (!film) {
      return res.status(404).json({ mess: `Filmas, id: ${id} neegzistuoja` });
    }

    const user = await User.findById(req.userInfo.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Vartotojas nerastas.'
      });
    }

    // Tikrinimas, jei vartotojas jau palikino filmą.
    const userAlreadyLiked = user.likes.some((like) => like.film === id);

    if (userAlreadyLiked) {
      return res.status(400).json({
        status: 'error',
        message: 'Jau patinka.'
      });
    }

    user.likes.push({ film: id, likedAt: new Date()});

    await user.save();

    const { password, ...data } = user._doc;
    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.dislikeFilm = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ status: "error", mess: `Blogai nurodytas ID` });
    }

    const film = await Film.findById(id);
    if (!film) {
      return res.status(404).json({ mess: `Filmas, id: ${id} neegzistuoja` });
    }

    const user = await User.findById(req.userInfo.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        mess: 'Vartotojas nerastas.'
      });
    }

    // Tikrinimas, ar filmId yra vartotojo likes masyve 
    const likedIndex = user.likes.findIndex(like => like.film === id);
    if (likedIndex === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'Film is not liked.'
      });
    }

    // Filmo salinimas is vartotojo likes masyvo 
    user.likes.splice(likedIndex, 1);
    await user.save();

    const { password, ...data } = user._doc;
    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};