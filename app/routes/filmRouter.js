const express = require("express");
const router = express.Router();

const {
  requireAuth,
  requireAdmin,
  getInfoIfUserExists,
} = require("../middlewares/authMiddleware");
const {
  getAllFilms,
  getFilm,
  addFilm,
  editFilm,
  deleteFilm,
  getUserLikedFilms,
  likeFilm,
  dislikeFilm,
} = require("../controllers/filmController.js");
const { validateFilm } = require("../validations/filmValidation");
router.route("/").get(getInfoIfUserExists, getAllFilms);
router.route("/").post(requireAuth, requireAdmin, validateFilm, addFilm);
router.route("/:id").patch(requireAuth, requireAdmin, validateFilm, editFilm);
router.route("/:id").get(getInfoIfUserExists, getFilm);
router.route("/:id").delete(requireAuth, requireAdmin, deleteFilm);

router.route("/like/:id").get(requireAuth, getUserLikedFilms);
router.route("/like/:id").post(requireAuth, likeFilm);
router.route("/like/:id").delete(requireAuth, dislikeFilm);
module.exports = router;
