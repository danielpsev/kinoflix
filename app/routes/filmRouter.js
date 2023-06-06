const express = require("express");
const router = express.Router();

const {requireAuth, requireAdmin, getInfoIfUserExists} = require("../middlewares/authMiddleware");
const {getAllFilms, getFilm, addFilm, deleteFilm, getUserLikedFilms, likeFilm, dislikeFilm} = require("../controllers/filmController.js");

router.route("/").get(getInfoIfUserExists, getAllFilms);
router.route("/").post(requireAuth, requireAdmin, addFilm);
router.route("/:id").get(getInfoIfUserExists, getFilm);
router.route("/:id").delete(requireAuth, requireAdmin, deleteFilm);
router.route("/like/:id").get(requireAuth, getUserLikedFilms);
router.route("/like/:id").post(requireAuth, likeFilm);
router.route("/like/:id").delete(requireAuth, dislikeFilm);
module.exports = router;