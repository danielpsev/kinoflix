import React, { useState } from "react";
import axios from "../../axios";
import AdminCSS from "./Admin.module.css";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import TrailerInfoModal from "./TrailerInfoModal";
import { filmValidation } from "../../func";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdmAddFilm = () => {
  const [trailerInfoModal, setTrailerInfoModal] = useState(false);
  const [currStep, setCurrStep] = useState(1);
  const navigate = useNavigate();
  const validate = (values : object) => {
    console.log(values);
    let errors : object = filmValidation(values);
    return errors;
  };

  const isReadyForNextStep = (nextStep : number)=> {
    const err_mess =
      "Užpildykite visus laukelius ir ištaisykite klaidas prieš pereinant toliau!";
    const {
      title,
      description,
      genres,
      country,
      director,
      releaseYear,
      duration,
      rating
    } = formik.values;
    if (nextStep === 2) {
      const hasProperties =
        formik.errors.hasOwnProperty("title") ||
        formik.errors.hasOwnProperty("description") ||
        formik.errors.hasOwnProperty("genres") ||
        formik.errors.hasOwnProperty("country");
      if (!hasProperties && title && description && genres && country) {
        setCurrStep(currStep + 1);
      } else {
        toast.error(err_mess);
      }
    } else if (nextStep === 3) {
      const hasProperties =
        formik.errors.hasOwnProperty("director") ||
        formik.errors.hasOwnProperty("releaseYear") ||
        formik.errors.hasOwnProperty("duration") ||
        formik.errors.hasOwnProperty("rating");
      if (!hasProperties && director && releaseYear && duration && rating) {
        setCurrStep(currStep + 1);
      } else {
        toast.error(err_mess);
      }
    }
  };

  const onSubmit = async (values : object) => {
    try {
      const res = await axios.post("/films/", values);
      formik.resetForm();
      toast.success("Filmas sėkmingai sukurtas");
      navigate("?type=films_list", { replace: true });
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
      posterSrc: "img_placeholder.webp",
      bgSrc: "img_placeholder.webp",
      trailerID: "",
    },
    onSubmit,
    validate,
  });
  return (
    <div className={`${AdminCSS.addFilmInner} mh-50vh`}>
      <div className={AdminCSS.addFilmContainer}>
        <div className={AdminCSS.addFilmContent}>
          {trailerInfoModal ? (
            <TrailerInfoModal
              trailerInfoModal={trailerInfoModal}
              setTrailerInfoModal={setTrailerInfoModal}
            />
          ) : null}
          <h3 className={`${AdminCSS.addFilm__title} text-color-second`}>
            Filmo pridėjimas
          </h3>
          <h4 className={`${AdminCSS.addFilm__step} text-color-second`}>
            Žingsnis <span className="acc-color">{currStep}</span> iš{" "}
            <span className="acc-color">3</span>
          </h4>
          <form
            noValidate
            className={AdminCSS.addFilmForm}
            onSubmit={formik.handleSubmit}
          >
            {currStep === 1 ? (
              <>
                <p>
                  <label className="text-color-second" htmlFor="title">
                    Filmo pavadinimas
                  </label>
                </p>
                <input
                  className={` ${
                    formik.touched.title && formik.errors.title ? "error" : ""
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
                  <label className="text-color-second" htmlFor="description">
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
                    formik.touched.genres && formik.errors.genres ? "error" : ""
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
              </>
            ) : null}

            {currStep === 2 ? (
              <>
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
                  <label className="text-color-second" htmlFor="releaseYear">
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
                    formik.touched.rating && formik.errors.rating ? "error" : ""
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
              </>
            ) : null}

            {currStep === 3 ? (
              <>
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
                  src={formik.values.posterSrc}
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
                    formik.touched.bgSrc && formik.errors.bgSrc ? "error" : ""
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
                  src={formik.values.bgSrc}
                  width="100%"
                  height="100px"
                  alt="filmo fonas"
                />
                <p>
                  <label
                    className={`${AdminCSS.labelWithIcon} text-color-second`}
                    htmlFor="trailerID"
                    title="Kur ieškoti trailer id?"
                  >
                    Trailer id{" "}
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
              </>
            ) : null}

            {currStep === 2 || currStep === 3 ? (
              <button
                type="button"
                className={`${AdminCSS.addFilmBtn} btn btn-secondary btn-success float-left`}
                onClick={() => setCurrStep(currStep - 1)}
              >
                Atgal
              </button>
            ) : null}
            {currStep === 1 || currStep === 2 ? (
              <button
                type="button"
                className={`${AdminCSS.addFilmBtn} btn btn-primary float-right`}
                onClick={() => {
                  isReadyForNextStep(currStep + 1);
                }}
              >
                Toliau
              </button>
            ) : null}
            {currStep === 3 ? (
              <button
                type="submit"
                className={`${AdminCSS.addFilmBtn} btn btn-success float-right`}
              >
                Pridėti
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmAddFilm;
