import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FilmCSS from "../Film/Film.module.css";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import TrailerInfoModal from "./TrailerInfoModal";
import YouTube from "react-youtube";
import { filmValidation } from "../../func";
import { useFormik } from "formik";
import AdminCSS from "./Admin.module.css";
export default function AdmEditFilm() {
  const [trailerInfoModal, setTrailerInfoModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname.split("/")[4];
  useEffect(() => {
    setIsLoading(true);
    const getFilm = async () => {
      try {
        const res = await axios.get("/films/" + path);
        const {
          _id,
          title,
          description,
          director,
          country,
          duration,
          releaseYear,
          rating,
          posterSrc,
          bgSrc,
          trailerID,
        } = res.data;
        const genres = res.data.genres.join(", ");
        formik.setValues({
          title,
          description,
          genres,
          country,
          director,
          releaseYear,
          duration,
          rating,
          posterSrc,
          bgSrc,
          trailerID,
        });
        setIsLoading(false);
      } catch (err : any) {
        toast.error(err.response.data.mess);
        // navigate('/');
      }
    };
    getFilm();
  }, [path]);

  const validate = (values : object) => {
    let errors = filmValidation(values);
    return errors;
  };

  const onSubmit = async (values : object) => {
    try {
      const res = await axios.patch("/films/" + path, values);
      toast.success("Filmas sėkmingai atnaujintas");
      navigate("/admin/?type=films_list", { replace: true });
    } catch (err : any) {
      console.log(err);
      console.log(err.response.data.mess);
      toast.error(`Klaida. ${err.response.data.mess}`);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genres: "",
      country: "",
      director: "",
      releaseYear: "",
      duration: "",
      rating: "",
      posterSrc: "",
      bgSrc: "",
      trailerID: "",
    },
    onSubmit,
    validate,
  });

  const videoId = formik.values.trailerID;
  const playerOptions = {
    playerVars: {
      autoplay: 0,
      mute: 1,
    },
  };

  return (
    <main>
      <style>
        {`.App::before {
          background-image: url(${
            formik.values.bgSrc && formik.values.bgSrc.substr(0, 4) === "http"
              ? formik.values.bgSrc
              : "../../../" + formik.values.bgSrc
          }) !important;
          background-size: cover;
        }`}
      </style>
      <div className="wrapper">
        {trailerInfoModal ? (
          <TrailerInfoModal
            trailerInfoModal={trailerInfoModal}
            setTrailerInfoModal={setTrailerInfoModal}
          />
        ) : null}
        <div>
          <div className={FilmCSS.FilmCover}>
            {isLoading ? (
              <BeatLoader
                color="#3474eb"
                margin={15}
                size={40}
                cssOverride={{
                  textAlign: "center",
                }}
              />
            ) : (
              <>
                <div className={FilmCSS.FilmCover__overlay}></div>
                <h3 className={`${AdminCSS.editFilmTitle} text-color-second`}>
                  Filmo redagavimas
                  <button
                    className={`${AdminCSS.editFilmBackBtn} btn btn-type-2 btn-secondary`}
                    onClick={() => navigate(`/admin/?type=films_list`)}
                    title="Atgal"
                  >
                    Atgal
                  </button>
                </h3>
                <section className={FilmCSS.FilmContainer}>
                  <form
                    noValidate
                    className={AdminCSS.editFilmForm}
                    onSubmit={formik.handleSubmit}
                  >
                    <p>
                      <label className="text-color-second" htmlFor="title">
                        Filmo pavadinimas
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.title && formik.errors.title
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Filmo pavadinimas"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.title}</span>
                      </div>
                    ) : null}

                    <p>
                      <label
                        className="text-color-second"
                        htmlFor="description"
                      >
                        Aprašymas
                      </label>
                    </p>
                    <textarea
                      className={` ${
                        formik.touched.description && formik.errors.description
                          ? "error"
                          : ""
                      }`}
                      id="description"
                      name="description"
                      placeholder="Filmo aprašymas"
                      rows={4}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.description}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="genres">
                        Žanras
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.genres && formik.errors.genres
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="genres"
                      name="genres"
                      placeholder="Filmo žanras"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.genres}
                    />
                    {formik.touched.genres && formik.errors.genres ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.genres}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="country">
                        Šalis
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.country && formik.errors.country
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Šalis"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.country}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="director">
                        Režisierius
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.director && formik.errors.director
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="director"
                      name="director"
                      placeholder="Režisierius"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.director}
                    />
                    {formik.touched.director && formik.errors.director ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.director}</span>
                      </div>
                    ) : null}

                    <p>
                      <label
                        className="text-color-second"
                        htmlFor="releaseYear"
                      >
                        Išleidimo metai
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.releaseYear && formik.errors.releaseYear
                          ? "error"
                          : ""
                      }`}
                      type="number"
                      min="1895"
                      id="releaseYear"
                      name="releaseYear"
                      placeholder="Išleidimo metai"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.releaseYear}
                    />
                    {formik.touched.releaseYear && formik.errors.releaseYear ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.releaseYear}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="duration">
                        Trukmė (min)
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.duration && formik.errors.duration
                          ? "error"
                          : ""
                      }`}
                      type="number"
                      id="duration"
                      name="duration"
                      placeholder="Trukmė minutėmis"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.duration}
                    />
                    {formik.touched.duration && formik.errors.duration ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.duration}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="rating">
                        Reitingas (0-10)
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.rating && formik.errors.rating
                          ? "error"
                          : ""
                      }`}
                      type="number"
                      min="0"
                      max="10"
                      id="rating"
                      name="rating"
                      placeholder="Reitingas nuo 0 iki 10"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rating}
                    />
                    {formik.touched.rating && formik.errors.rating ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.rating}</span>
                      </div>
                    ) : null}

                    <p>
                      <label className="text-color-second" htmlFor="posterSrc">
                        Filmo afišos nuoroda
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.posterSrc && formik.errors.posterSrc
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="posterSrc"
                      name="posterSrc"
                      placeholder="Filmo afišos nuoroda"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.posterSrc}
                    />
                    {formik.touched.posterSrc && formik.errors.posterSrc ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.posterSrc}</span>
                      </div>
                    ) : null}
                    <img
                      className="mt-10"
                      src={
                        formik.values.posterSrc.substr(0, 4) === "http"
                          ? formik.values.posterSrc
                          : "../../../" + formik.values.posterSrc
                      }
                      width="100px"
                      alt="filmo afiša"
                    />
                    <p>
                      <label className="text-color-second" htmlFor="bgSrc">
                        Filmo fono nuoroda
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.bgSrc && formik.errors.bgSrc
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="bgSrc"
                      name="bgSrc"
                      placeholder="Fono nuoroda"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bgSrc}
                    />
                    {formik.touched.bgSrc && formik.errors.bgSrc ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.bgSrc}</span>
                      </div>
                    ) : null}
                    <img
                      className="mt-10 object-fit-cover"
                      src={
                        formik.values.bgSrc.substr(0, 4) === "http"
                          ? formik.values.bgSrc
                          : "../../../" + formik.values.bgSrc
                      }
                      width="100%"
                      height="300px"
                      alt="filmo fonas"
                    />
                    <p>
                      <label
                        className={`${AdminCSS.labelWithIcon} text-color-second`}
                        htmlFor="trailerID"
                        title="Kur ieškoti trailer id?"
                      >
                        Trailer id
                        <BsFillPatchQuestionFill
                          className="pointer"
                          onClick={() => setTrailerInfoModal(true)}
                        />
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.trailerID && formik.errors.trailerID
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="trailerID"
                      name="trailerID"
                      placeholder="Trailer id"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.trailerID}
                    />
                    {formik.touched.trailerID && formik.errors.trailerID ? (
                      <div className="error-mess-box">
                        <AiFillWarning className="error-mess-icon" />
                        <span>{formik.errors.trailerID}</span>
                      </div>
                    ) : null}
                    <button
                      type="submit"
                      className={`${AdminCSS.editFilmSaveBtn} btn btn-success float-right mt-10`}
                    >
                      Išsaugoti
                    </button>
                  </form>
                </section>
                <div className={FilmCSS.FilmTrailerContainer}>
                  <YouTube videoId={videoId} opts={playerOptions} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
