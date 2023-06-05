const Film = require("../models/filmModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");





exports.getAllFilms = async (req, res) => {
  const { page = 1, limit = 12, filter, sort_name, sort_type, title } = req.query;

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
      sort['createdAt'] = 'asc';
    }
    if (title) {
      filter_data.title = { $regex: title, $options: 'i' };
    }

    let allFilms = await Film.find(filter_data)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const count = await Film.countDocuments(filter_data).exec();

    if (title && allFilms.length === 0) {
      return res.status(200).json({
        status: 'success',
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

// exports.getAllFilms = async (req, res) => {
//   const {page = 1, limit = 10} = req.query;
//   try {

//     let {filter, sort_name, sort_type} = req.query; 
//     let filter_data = {};
//     if(filter){
//         filter_data = {status: filter}
//     }
//     if(sort_name != 'title' && sort_name != 'price' && sort_name != 'createdAt'){
//         sort_name = null;
//     }
//     const allFilms = await Film.find(filter_data)
//     .sort({[sort_name]: sort_type})
//     .limit(limit * 1)
//     .skip((page - 1) * limit);


//     const count = await Film.countDocuments();
//    res.status(200).json(
//     {
//       status: "success",
//       data: {
//         films: allFilms, 
//         totalPages: Math.ceil(count / limit),
//         currentPage: page
//       }
//     }
//     );
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// exports.getAllFilms = async (req, res) => {
//   const { limit = 0 } = req.query;

//   try {
//     const allFilms = await Film.find()
//       .sort({ date: -1 })
//       .limit(limit);

//     res.status(200).json({
//       status: "success",
//       results: allFilms.length,
//       data: {
//         films: allFilms,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };
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

    // Check if the filmId already exists in the likes array of the user
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

    // Check if the filmId exists in the likes array of the user
    const likedIndex = user.likes.findIndex(like => like.film === id);
    if (likedIndex === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'Film is not liked.'
      });
    }

    // Remove the film from the user's likes array
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

// exports.deleteIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Delete_Income = await Income.findById(id);
//     if (!Delete_Income) {
//       return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
//     } else {
//       if (Delete_Income.user_id == req.userInfo.id) {
//         console.log("true");
//         try {
//           await Income.findByIdAndDelete(id);
//           await saveAction(req.userInfo.id, "income_delete", Delete_Income);
//           res.status(200).json({
//             status: "success",
//             message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
//             income: Delete_Income,
//           });
//         } catch (error) {
//           res.status(500).json({ error: error.message });
//         }
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.editIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Edit_Income = await Income.findById(id);
//     if (!Edit_Income) {
//       return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
//     } else {
//       if (Edit_Income.user_id == req.userInfo.id) {
//         try {
//           const Updated_Income = await Income.findOneAndUpdate(
//             {
//               _id: id,
//             },
//             {
//               user_id: req.userInfo.id,
//               title: req.body.title,
//               sum: req.body.sum,
//               date: addTime(req.body.date),
//             }
//           );
//           await saveAction(req.userInfo.id, "income_edit", Updated_Income);
//           res.json({
//             status: "success",
//             data: Updated_Income,
//           });
//         } catch (error) {
//           res.status(500).json({ error: error.message });
//         }
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
