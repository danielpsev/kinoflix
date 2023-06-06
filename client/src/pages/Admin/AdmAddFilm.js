import React, { useEffect, useState } from "react";
import axios from "../../axios";
import AdminCSS from "./Admin.module.css";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";
import {BsFillPatchQuestionFill} from "react-icons/bs";
import TrailerInfoModal from "./TrailerInfoModal";
const AdmAddFilm = () => {
  const [trailerInfoModal, setTrailerInfoModal] = useState(false);
  const [currStep, setCurrStep] = useState(1);

  const errMessage = (type, field, value) => {
    let mess = "Klaida";
    switch (type) {
      case "required":
        mess = `Prašome užpildyti laukelį (${field})`;
        break;
      case "min_symbols":
        mess = `${field} turi būti min. ${value} simbolių!`;
        break;
      case "max_symbols":
        mess = `${field} turi būti max. ${value} simbolių!`;
        break;
    }
    return mess;
  };

  const validate = (values) => {
    let errors = {};
    const { title, description, genre, country } = values;
    if (!title) {
      errors.title = errMessage("required", "Pavadinimas");
    } else if (title.length < 2) {
      errors.title = errMessage("min_symbols", "Pavadinimas", 2);
    } else if (title.length > 15) {
      errors.title = errMessage("max_symbols", "Pavadinimas", 15);
    } else if (!/^[a-zA-Z0-9 ]+$/.test(title)) {
      errors.title =
        "Pavadinimas turi būti sudarytas tik iš lotyniškų raidžių ir skaičių!";
    }

    if (!description) {
      errors.description = errMessage("required", "Aprašymas");
    } else if (description.length < 2) {
      errors.description = errMessage("min_symbols", "Aprašymas", 2);
    }

    if (!genre) {
      errors.genre = errMessage("required", "Žanras");
    } else if (genre.length < 2) {
      errors.genre = errMessage("min_symbols", "Žanras", 2);
    } else if (genre.length > 15) {
      errors.genre = errMessage("max_symbols", "Žanras", 15);
    }

    if (!country) {
      errors.country = errMessage("required", "Šalis");
    } else if (country.length < 2) {
      errors.country = errMessage("min_symbols", "Šalis", 2);
    } else if (country.length > 15) {
      errors.country = errMessage("max_symbols", "Šalis", 15);
    }

    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    //   let { title } = values;
    //   const res = await axios.post("/auth/register", {
    //     username,
    //     email,
    //     password,
    //     password_repeat,
    //   });
    //   formik.resetForm();
    //   // toast.success("Paskyra sėkmingai sukurta");
    // } catch (err) {
    //   // toast.error(err.response.data.mess);
    // }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: "",
      country: "",
      director: "",
      releaseYear: "",
      duration: "",
      rating: "",
      posterSrc: "",
      bgSrc: "",
      trailerID: ""


    },
    onSubmit,
    validate,
  });
  return (
    <div className={AdminCSS.addFilmContainer}>
      <div className={AdminCSS.addFilmContent}>
      {trailerInfoModal ? <TrailerInfoModal trailerInfoModal={trailerInfoModal} setTrailerInfoModal={setTrailerInfoModal}/> : null}
        <h3 className={`${AdminCSS.addFilm__title} text-color-second`}>
          Filmo pridėjimas.
        </h3>
        <h4 className={`${AdminCSS.addFilm__step} text-color-second`}>
          Žingsnis <span className="acc-color">{currStep}</span> iš <span className="acc-color">3</span>
        </h4>
        <form
          noValidate
          className={AdminCSS.addFilmForm}
          onSubmit={formik.handleSubmit}
        >
          {currStep == 1 ? (
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
                <label className="text-color-second" htmlFor="genre">
                  Žanras
                </label>
              </p>
              <input
                className={` ${
                  formik.touched.genre && formik.errors.genre ? "error" : ""
                }`}
                type="text"
                id="genre"
                name="genre"
                placeholder="Filmo žanras"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
              />
              {formik.touched.genre && formik.errors.genre ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.genre}</span>
                </div>
              ) : null}

              <p>
                <label className="text-color-second" htmlFor="country">
                  Šalis
                </label>
              </p>
              <input
                className={` ${
                  formik.touched.country && formik.errors.country ? "error" : ""
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

          {currStep == 2 ? (
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



{currStep == 3 ? (
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

<p>
                <label className={`${AdminCSS.labelWithIcon} text-color-second`} htmlFor="trailerID">
                  Trailer id <BsFillPatchQuestionFill className="pointer" onClick={() => setTrailerInfoModal(true)}/>
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


          {currStep == 2 || currStep == 3 ? (
            <button
              type="button"
              className={`${AdminCSS.addFilmBtn} btn btn-secondary btn-success float-left`}
              onClick={() => setCurrStep(currStep - 1)}
            >
              Atgal
            </button>
          ) : null}
          {currStep == 1 || currStep == 2 ? (
            <button
              type="button"
              className={`${AdminCSS.addFilmBtn} btn btn-primary float-right`}
              onClick={() => setCurrStep(currStep + 1)}
            >
              Toliau
            </button>
          ) : (
            <button
              type="submit"
              className={`${AdminCSS.addFilmBtn} btn btn-success float-right`}
            >
              Pridėti
            </button>
          )}

        </form>
      </div>
    </div>
  );
};

export default AdmAddFilm;
